import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'messages.json');

type Message = {
  id: number;
  content: string;
};

export async function getMessages(): Promise<Array<Message>> {
  const messages = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(messages);
}

export async function addMessage(content: string) {
  const messages = await getMessages();
  messages.push({
    id: Date.now(),
    content
  });
  await fs.writeFile(filePath, JSON.stringify(messages));
}
