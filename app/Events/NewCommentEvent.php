<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

use App\Comment;

class NewCommentEvent implements ShouldBroadcast
{
	use InteractsWithSockets;
    /**
     * Information about the shipping status update.
     *
     * @var string
     */
    public $comment;

     public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }



    public function broadcastOn()
{
    return ['tester'];
}
}