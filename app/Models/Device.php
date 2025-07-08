<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Device extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'mac_address',
        'model',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function provisioningJobs()
    {
        return $this->hasMany(ProvisioningJob::class);
    }

    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class);
    }
}
