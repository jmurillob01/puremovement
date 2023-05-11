<?php

namespace App\Exceptions;

use Exception;
use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Response;
class MyCustomException extends Exception
{

    public function render($message="", $code=0, Request $request): Response
    {
        $help = "Contact admin";

        return response(["error" => $message, "help" => $help], $code);
    }
}