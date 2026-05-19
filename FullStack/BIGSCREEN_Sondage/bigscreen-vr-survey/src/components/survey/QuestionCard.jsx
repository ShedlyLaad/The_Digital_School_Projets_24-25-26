// src/lib/constants.js

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'A',
  TEXT: 'B',
  SCALE: 'C',
};

export const MESSAGES = {
  VALIDATION_ERRORS: {
    required: 'Ce champ est requis',
    email: 'Adresse email invalide',
    maxLength: 'Texte trop long',
  },
  SURVEY_COMPLETION: {
    title: 'Merci pour votre participation !',
    content: 'Vos réponses ont bien été enregistrées.',
    responseLink: 'Voici votre lien de consultation :',
  },
  SURVEY_COMPLETE: "Votre réponse a bien été enregistrée. Merci pour votre participation !",
};

export const ROUTES = {
  HOME: '/',
  SURVEY: '/survey',
  RESPONSES: '/responses/:id',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
};

function QuestionCard({ question, value, onChange, error }) {
  const options = question.options ? (
    typeof question.options === 'string'
      ? JSON.parse(question.options)
      : question.options
  ) : null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          <Label className="font-semibold">{question.question_text}</Label>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {question.question_type === QUESTION_TYPES.MULTIPLE_CHOICE && options && (
          <RadioGroup
            value={value || ''}
            onValueChange={onChange}
            className="space-y-2"
          >
            {options.map((option, idx) => (
              <Label key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q_${question.id}_${idx}`} />
                <span>{option}</span>
              </Label>
            ))}
          </RadioGroup>
        )}
        {question.question_type === QUESTION_TYPES.TEXT && (
          <Input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        )}
        {question.question_type === QUESTION_TYPES.SCALE && (
          <RadioGroup
            value={value !== undefined ? String(value) : ''}
            onValueChange={val => onChange(Number(val))}
            className="flex gap-4"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <Label key={num} className="flex flex-col items-center space-x-2">
                <RadioGroupItem value={String(num)} id={`q_${question.id}_scale_${num}`} />
                <span>{num}</span>
              </Label>
            ))}
          </RadioGroup>
        )}
        {error && <div className="text-destructive text-sm mt-1">{error}</div>}
      </CardContent>
    </Card>
  );
}

export default QuestionCard;