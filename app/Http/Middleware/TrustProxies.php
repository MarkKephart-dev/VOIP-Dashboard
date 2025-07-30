<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Fideloper\Proxy\TrustProxies as Middleware;

class TrustProxies extends Middleware
{
    protected $proxies = '*'; // Trust all proxies (Cloud Run counts)
    protected $headers = Request::HEADER_X_FORWARDED_ALL;
}