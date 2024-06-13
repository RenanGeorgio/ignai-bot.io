import prisma from '@typebot.io/lib/prisma'
import { authenticatedProcedure } from '@/helpers/server/trpc'
import { TRPCError } from '@trpc/server'
import {
  resultWithAnswersSchema,
  typebotV5Schema,
} from '@typebot.io/schemas'
import { z } from 'zod'

import {
  timeFilterValues,
  defaultTimeFilter,
} from '@/features/analytics/constants'
import {
  parseFromDateFromTimeFilter,
  parseToDateFromTimeFilter,
} from '@/features/analytics/helpers/parseDateFromTimeFilter'

const maxLimit = 100

export const listTypebotsResults = authenticatedProcedure
  .meta({
    // https://github.com/jlalmes/trpc-openapi/issues/391
    // openapi: {
    //   method: 'GET',
    //   path: '/v1/typebots/results/listResults',
    //   protect: true,
    //   summary: 'List results ordered by descending creation date',
    //   tags: ['Results'],
    // },
  })
  .input(
    z.object({
      // list of typebots ids
      typebotsIds: z
        .array(z.string())
        .describe(
          "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)"
        ),
      limit: z.coerce.number().min(1).max(maxLimit).default(50),
      cursor: z.string().optional(),
      timeFilter: z.enum(timeFilterValues).default(defaultTimeFilter),
      timeZone: z.string().optional(),
    })
  )
  .output(
    z.object({
      results: z.array(resultWithAnswersSchema),
      typebots: z.array(
        typebotV5Schema._def.schema.pick({
          id: true,
          groups: true,
          collaborators: true,
          variables: true,
          workspace: true,
        })
      ),
      nextCursor: z.string().nullish(),
    })
  )
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  .query(async ({ input, ctx: { user } }) => {
    const limit = Number(input.limit)
    if (limit < 1 || limit > maxLimit)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `limit must be between 1 and ${maxLimit}`,
      })
    const { cursor } = input
    const typebots = await prisma.typebot.findMany({
      where: {
        id: { in: input.typebotsIds },
      },
      select: {
        id: true,
        groups: true,
        collaborators: {
          select: {
            userId: true,
            type: true,
          },
        },
        workspace: {
          select: {
            isSuspended: true,
            isPastDue: true,
            members: {
              select: {
                userId: true,
              },
            },
          },
        },
        variables: true,
      },
    })

    if (!(typebots.length > 0) || !user)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Typebot not found' })

    const fromDate = parseFromDateFromTimeFilter(
      input.timeFilter,
      input.timeZone
    )
    const toDate = parseToDateFromTimeFilter(input.timeFilter, input.timeZone)

    const results = await prisma.result.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        typebotId: { in: typebots.map((typebot) => typebot.id) },
        hasStarted: true,
        isArchived: false,
        createdAt: fromDate
          ? {
              gte: fromDate,
              lte: toDate ?? undefined,
            }
          : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: { answers: true },
    })

    let nextCursor: typeof cursor | undefined
    if (results.length > limit) {
      const nextResult = results.pop()
      nextCursor = nextResult?.id
    }

    return {
      results: z.array(resultWithAnswersSchema).parse(results),
      typebots: typebots,
      nextCursor,
    }
  })
