/**
 * Server-side API endpoint to load knowledge base files
 * Required by knowledgeBaseLoader.ts
 * Must be implemented in Next.js API routes or serverless function
 */

import { promises as fs } from 'fs';
import { join, basename } from 'path';

const KNOWLEDGE_BASE_PATH = 'C:\\Diretrizes_TikTok';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!file) {
        return Response.json({ error: 'File parameter required' }, { status: 400 });
    }

    try {
        const filePath = join(KNOWLEDGE_BASE_PATH, file);

        // Security: Prevent directory traversal
        if (!filePath.startsWith(KNOWLEDGE_BASE_PATH)) {
            return Response.json({ error: 'Invalid file path' }, { status: 403 });
        }

        const content = await fs.readFile(filePath, 'utf-8');

        // Extract title from first line (markdown header)
        const titleMatch = content.match(/^#\s+(.+)/m);
        const title = titleMatch ? titleMatch[1].trim() : file;

        return Response.json({
            filename: file,
            title,
            content
        });

    } catch (error) {
        console.error(`Error loading ${file}:`, error);
        return Response.json({ error: 'File not found' }, { status: 404 });
    }
}

export async function POST(request: Request) {
    const { filePath } = await request.json();

    if (!filePath) {
        return Response.json({ error: 'FilePath required' }, { status: 400 });
    }

    try {
        // Security check
        if (!filePath.startsWith(KNOWLEDGE_BASE_PATH)) {
            return Response.json({ error: 'Invalid file path' }, { status: 403 });
        }

        const content = await fs.readFile(filePath, 'utf-8');

        const titleMatch = content.match(/^#\s+(.+)/m);
        const title = titleMatch ? titleMatch[1].trim() : basename(filePath);

        return Response.json({
            filename: basename(filePath),
            title,
            content
        });

    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        return Response.json({ error: 'File not found' }, { status: 404 });
    }
}
