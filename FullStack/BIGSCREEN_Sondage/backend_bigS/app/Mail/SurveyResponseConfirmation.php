<?php

namespace App\Mail;

use App\Models\SurveyResponse;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SurveyResponseConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $response;
    public $previewUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(SurveyResponse $response, string $previewUrl)
    {
        $response->loadMissing(['personaldata', 'survey']);
        $this->response = $response;
        $this->previewUrl = $previewUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $surveyTitle = $this->response->survey ? $this->response->survey->title : 'Sondage';
        return new Envelope(
            subject: 'Merci pour votre participation - ' . $surveyTitle,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.survey-response-confirmation',
            with: [
                'response' => $this->response,
                'previewUrl' => $this->previewUrl,
            ],
        );
    }
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}