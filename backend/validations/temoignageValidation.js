import { body, param } from 'express-validator';

const temoignageRules = [
    body('nom').isLength({ min: 5 }).withMessage('Le nom doit contenir au moins 5 caractères'),
    body('email').isLength({ min: 5 }).withMessage('L\'email doit être valide'),
    body('message').isLength({ min: 10 }).withMessage('Le message doit contenir au moins 10 caractères'),
   
];

export default temoignageRules;