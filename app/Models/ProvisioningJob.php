<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProvisioningJob extends Model
{
    use HasFactory;
    protected $fillable = [
        'device_id',
        'status',
        'details',
        'scheduled_at',
        'completed_at',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class);
    }
}
