
import { number, string } from 'joi';

// ID d'URL : entier positif
const idParam = number().integer().positive().required();

// Champ string non vide générique
const nonEmptyString = string().trim().min(1).max(255);

export default { idParam, nonEmptyString };