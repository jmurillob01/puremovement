<?php

namespace App\Models\Exceptions;

use Exception;
use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Response;

echo "test";
class createUserException extends Exception
{
    public function render($message, $code, Request $request): Response
    {
        // some code
        $status = $code;
        $error = $message;
        $help = "Contact the sales team to verify";

        // make sure everything is assigned properly
        return response(["error" => $error, "help" => $help], $status);
    }
}
