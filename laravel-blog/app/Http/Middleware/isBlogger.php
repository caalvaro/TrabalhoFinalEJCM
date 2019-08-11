<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class isBlogger
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::User();
        if($user->isBlogger == 1)
        {
            return $next($request);
        }
        else {
            return response()->json(['Apenas Bloggers podem criar, editar e excluir posts']);
        }
    }
}
