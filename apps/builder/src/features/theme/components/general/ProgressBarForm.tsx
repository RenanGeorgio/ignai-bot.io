import { ColorPicker } from '@/components/ColorPicker'
import { DropdownList } from '@/components/DropdownList'
import { SwitchWithRelatedSettings } from '@/components/SwitchWithRelatedSettings'
import { NumberInput } from '@/components/inputs'
import { FormLabel, HStack } from '@chakra-ui/react'
import { ProgressBar } from '@typebot.io/schemas'
import {
  defaultProgressBarBackgroundColor,
  defaultProgressBarColor,
  defaultProgressBarIsEnabled,
  defaultProgressBarPlacement,
  defaultProgressBarPosition,
  defaultProgressBarThickness,
  progressBarPlacements,
  progressBarPositions,
} from '@typebot.io/schemas/features/typebot/theme/constants'

type Props = {
  progressBar: ProgressBar | undefined
  onProgressBarChange: (progressBar: ProgressBar) => void
}

export const ProgressBarForm = ({ progressBar, onProgressBarChange }: Props) => {
  const updateEnabled = (isEnabled: boolean) => onProgressBarChange({ ...progressBar, isEnabled });

  const updateColor = (color: string) => onProgressBarChange({ ...progressBar, color });

  const updatePlacement = (placement: (typeof progressBarPlacements)[number]) => onProgressBarChange({ ...progressBar, placement });

  const updatePosition = (position: (typeof progressBarPositions)[number]) => onProgressBarChange({ ...progressBar, position });

  const updateThickness = (thickness?: number) => onProgressBarChange({ ...progressBar, thickness });

  const updateBackgroundColor = (backgroundColor: string) => onProgressBarChange({ ...progressBar, backgroundColor });

  return (
    <SwitchWithRelatedSettings
      label={'Ativar barra de progresso?'}
      initialValue={progressBar?.isEnabled ?? defaultProgressBarIsEnabled}
      onCheckChange={updateEnabled}
    >
      <DropdownList
        size="sm"
        direction="row"
        label="Localização:"
        currentItem={progressBar?.placement ?? defaultProgressBarPlacement}
        onItemSelect={updatePlacement}
        items={progressBarPlacements}
      />

      <HStack justifyContent="space-between">
        <FormLabel mb="0" mr="0">
          Cor do Background:
        </FormLabel>
        <ColorPicker
          defaultValue={
            progressBar?.backgroundColor ?? defaultProgressBarBackgroundColor
          }
          onColorChange={updateBackgroundColor}
        />
      </HStack>
      <HStack justifyContent="space-between">
        <FormLabel mb="0" mr="0">
          Cor:
        </FormLabel>
        <ColorPicker
          defaultValue={progressBar?.color ?? defaultProgressBarColor}
          onColorChange={updateColor}
        />
      </HStack>
      <NumberInput
        label="Espessura:"
        direction="row"
        withVariableButton={false}
        maxW="100px"
        defaultValue={progressBar?.thickness ?? defaultProgressBarThickness}
        onValueChange={updateThickness}
        size="sm"
      />
      <DropdownList
        size="sm"
        direction="row"
        label="Posição quando incorporado:"
        moreInfoTooltip='Selecione "fixo" para sempre posicionar a barra de progresso no topo da janela, mesmo que seu bot esteja incorporado. Selecione “absoluto” para posicionar a barra de progresso na parte superior do contêiner de bate-papo.'
        currentItem={progressBar?.position ?? defaultProgressBarPosition}
        onItemSelect={updatePosition}
        items={progressBarPositions}
      />
    </SwitchWithRelatedSettings>
  );
}