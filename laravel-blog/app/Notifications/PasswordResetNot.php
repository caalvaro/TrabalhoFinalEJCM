<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class PasswordResetNot extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($reset)
    {
        $this->reset = $reset;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $reset = $this->reset;
        $urlConfirm = url('/api/passwordResetConfirm/'.$this->reset->token);
        $urlCancel = url('/api/passwordResetCancel/'.$this->reset->token);
        return (new MailMessage)
                    ->greeting('Olá,Usuário do Postin')
                    ->line('Nós recebemos a sua requisição de troca de senha.')
                    ->line('Ao clicar em confirmar,sua nova senha será:')
                    ->line($reset->password) 
                    ->action('Confirmar', $urlConfirm)
                    ->line('Ao logar, acesse o seu perfil e altere para a senha que desejar.')
                    ->line('Caso não tenha desejado trocar sua senha, clique no link abaixo')
                    ->line($urlCancel);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
