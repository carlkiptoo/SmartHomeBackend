import path from 'path';
import { fileURLToPath } from 'url';

export const resolvePath = (metaUrl, relativePath) => {
    const __filename = fileURLToPath(metaUrl);
    return path.resolve(path.dirname(__filename), relativePath);
};
