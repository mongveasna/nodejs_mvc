module.exports = {
    "driver": "redis",
    "port": 6379,
    "host": "127.0.0.1",
    "options": {
        "parser": "javascript",
        "return_buffers": false,
        "detect_buffers": false,
        "socket_nodelay": true,
        "socket_keepalive": true,
        "no_ready_check": false,
        "enable_offline_queue": true,
        "retry_max_delay": null,
        "connect_timeout": false,
        "max_attempts": null,
        // "auth_pass": "894G4542Y75xtwEAVo2m", 
        "family": "IPv4",
		// "password": "qMCpW8gc3V94"
    }
}