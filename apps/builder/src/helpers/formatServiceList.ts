type Services = {
  [key: string]: { username: string }
};

export function formatServiceList(data: Services) {
  const list: Record<string, { id: string; used: boolean }> = {};

  const mappings = [
    { key: 'telegramObj', path: 'telegram.username' },
    { key: 'igObj', path: 'instagram.username' },
    { key: 'webObj', path: 'webchat.username' },
    { key: 'whatsappObj', path: 'whatsapp.username' },
    { key: 'emailObj', path: 'email.username' },
    { key: 'msgObj', path: 'msg.username' },
    { key: 'hasNumbers', path: 'hasNumbers' },
    { key: 'numbersList', path: 'numbersList' },
  ];

  mappings.forEach(mapping => {
    // corrigir erro de tipo dps
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = mapping.path.split('.').reduce((o, p) => o?.[p], data);
    if (value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      list[mapping.key] = { id: value, used: true };
    }
  });

  return list;
}


