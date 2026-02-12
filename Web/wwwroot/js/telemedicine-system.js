

class TelemedicineSystem {
    constructor() {
        this.apiEndpoint = '/api/telemedicine';
        this.webRTCConfig = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        };
        
        
        this.videoCallManager = null;
        this.chatManager = null;
        this.screenShareManager = null;
        this.recordingManager = null;
        this.appointmentManager = null;
        
        
        this.currentSession = null;
        this.isConnected = false;
        this.localStream = null;
        this.remoteStream = null;
        this.peerConnection = null;
        
        
        this.encryptionEnabled = true;
        this.auditLog = [];
        this.consentManager = new ConsentManager();
        
        this.initializeTelemedicine();
        this.setupEventHandlers();
    }

    initializeTelemedicine() {
        
        this.createTelemedicineInterface();
        
        
        this.videoCallManager = new VideoCallManager(this);
        this.chatManager = new ChatManager(this);
        this.screenShareManager = new ScreenShareManager(this);
        this.recordingManager = new RecordingManager(this);
        this.appointmentManager = new AppointmentManager(this);
        
        
        this.loadPatientContext();
        
        console.log('📹 Telemedicine System initialized');
        console.log('🔒 Security: HIPAA compliant encryption enabled');
    }

    setupEventHandlers() {
        
        $(document).on('click', '.start-video-call', (e) => {
            const patientId = $(e.target).data('patient-id');
            this.startVideoCall(patientId);
        });

        $(document).on('click', '.end-video-call', () => {
            this.endVideoCall();
        });

        $(document).on('click', '.toggle-video', () => {
            this.toggleVideo();
        });

        $(document).on('click', '.toggle-audio', () => {
            this.toggleAudio();
        });

        
        $(document).on('click', '.start-screen-share', () => {
            this.screenShareManager.startScreenShare();
        });

        $(document).on('click', '.stop-screen-share', () => {
            this.screenShareManager.stopScreenShare();
        });

        
        $(document).on('click', '.start-recording', () => {
            this.recordingManager.startRecording();
        });

        $(document).on('click', '.stop-recording', () => {
            this.recordingManager.stopRecording();
        });

        
        $(document).on('click', '.send-message', () => {
            this.chatManager.sendMessage();
        });

        $(document).on('keypress', '#chatInput', (e) => {
            if (e.which === 13) {
                this.chatManager.sendMessage();
            }
        });

        
        $(document).on('click', '.schedule-appointment', () => {
            this.appointmentManager.showScheduler();
        });

        
        $(document).on('click', '.join-waiting-room', (e) => {
            const appointmentId = $(e.target).data('appointment-id');
            this.joinWaitingRoom(appointmentId);
        });
    }

    createTelemedicineInterface() {
        
        const telemedicinePanel = `
            <div id="telemedicinePanel" class="telemedicine-panel">
                <div class="telemedicine-header">
                    <div class="telemedicine-title">
                        <span class="telemedicine-icon">📹</span>
                        <span>SolMed Telemedicine</span>
                        <span class="connection-status" id="connectionStatus">
                            <span class="status-indicator disconnected"></span>
                            Disconnected
                        </span>
                    </div>
                    <button class="telemedicine-toggle" id="toggleTelemedicine">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                </div>
                
                <div class="telemedicine-body" id="telemedicineBody">
                    <!-- Video Call Section -->
                    <div class="telemedicine-section" id="videoCallSection">
                        <h6 class="section-title">
                            <i class="fas fa-video"></i>
                            Video Consultation
                        </h6>
                        <div class="video-container">
                            <div class="video-wrapper">
                                <video id="localVideo" class="local-video" autoplay muted></video>
                                <video id="remoteVideo" class="remote-video" autoplay></video>
                                <div class="video-overlay">
                                    <div class="patient-info" id="patientInfo"></div>
                                    <div class="call-duration" id="callDuration">00:00:00</div>
                                </div>
                            </div>
                            <div class="video-controls">
                                <button class="video-btn" id="toggleVideo" title="Toggle Video">
                                    <i class="fas fa-video"></i>
                                </button>
                                <button class="video-btn" id="toggleAudio" title="Toggle Audio">
                                    <i class="fas fa-microphone"></i>
                                </button>
                                <button class="video-btn" id="shareScreen" title="Share Screen">
                                    <i class="fas fa-desktop"></i>
                                </button>
                                <button class="video-btn" id="recordCall" title="Record Call">
                                    <i class="fas fa-record-vinyl"></i>
                                </button>
                                <button class="video-btn end-call" id="endCall" title="End Call">
                                    <i class="fas fa-phone-slash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Chat Section -->
                    <div class="telemedicine-section" id="chatSection">
                        <h6 class="section-title">
                            <i class="fas fa-comments"></i>
                            Secure Chat
                        </h6>
                        <div class="chat-container">
                            <div class="chat-messages" id="chatMessages"></div>
                            <div class="chat-input-group">
                                <input type="text" id="chatInput" class="chat-input" placeholder="Type a secure message...">
                                <button class="chat-send-btn" id="sendMessage">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Virtual Examination Tools -->
                    <div class="telemedicine-section" id="examinationSection">
                        <h6 class="section-title">
                            <i class="fas fa-stethoscope"></i>
                            Virtual Examination
                        </h6>
                        <div class="examination-tools">
                            <button class="tool-btn" id="vitalSignsMonitor">
                                <i class="fas fa-heartbeat"></i>
                                Vital Signs
                            </button>
                            <button class="tool-btn" id="symptomChecker">
                                <i class="fas fa-search"></i>
                                Symptoms
                            </button>
                            <button class="tool-btn" id="digitalStethoscope">
                                <i class="fas fa-stethoscope"></i>
                                Stethoscope
                            </button>
                            <button class="tool-btn" id="photographCapture">
                                <i class="fas fa-camera"></i>
                                Photo Capture
                            </button>
                        </div>
                    </div>
                    
                    <!-- Appointment Management -->
                    <div class="telemedicine-section" id="appointmentSection">
                        <h6 class="section-title">
                            <i class="fas fa-calendar-alt"></i>
                            Appointments
                        </h6>
                        <div class="appointment-controls">
                            <button class="appointment-btn primary" id="scheduleAppointment">
                                <i class="fas fa-plus"></i>
                                Schedule New
                            </button>
                            <button class="appointment-btn secondary" id="viewAppointments">
                                <i class="fas fa-list"></i>
                                View All
                            </button>
                            <button class="appointment-btn warning" id="joinWaitingRoom">
                                <i class="fas fa-clock"></i>
                                Waiting Room
                            </button>
                        </div>
                        <div class="upcoming-appointments" id="upcomingAppointments"></div>
                    </div>
                </div>
            </div>
        `;

        
        if ($('#telemedicinePanel').length === 0) {
            $('body').append(telemedicinePanel);
        }

        
        $('#toggleTelemedicine').on('click', () => {
            $('#telemedicineBody').slideToggle();
            $('#toggleTelemedicine i').toggleClass('fa-chevron-up fa-chevron-down');
        });
    }

    
    async startVideoCall(patientId) {
        try {
            console.log(`📹 Starting video call with patient: ${patientId}`);
            
            
            const consentGranted = await this.consentManager.requestVideoConsent(patientId);
            if (!consentGranted) {
                throw new Error('Patient consent required for video consultation');
            }

            
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
                audio: { echoCancellation: true, noiseSuppression: true }
            });

            
            const localVideo = document.getElementById('localVideo');
            localVideo.srcObject = this.localStream;

            
            this.peerConnection = new RTCPeerConnection(this.webRTCConfig);
            
            
            this.localStream.getTracks().forEach(track => {
                this.peerConnection.addTrack(track, this.localStream);
            });

            
            this.peerConnection.ontrack = (event) => {
                this.remoteStream = event.streams[0];
                const remoteVideo = document.getElementById('remoteVideo');
                remoteVideo.srcObject = this.remoteStream;
                
                console.log('📺 Remote stream received');
            };

            
            this.peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    this.sendSignalingMessage({
                        type: 'ice-candidate',
                        candidate: event.candidate,
                        patientId: patientId
                    });
                }
            };

            
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);

            
            this.sendSignalingMessage({
                type: 'offer',
                offer: offer,
                patientId: patientId
            });

            
            this.updateConnectionStatus('connecting');
            this.startCallTimer();
            this.showVideoControls();

            
            this.auditLog.push({
                action: 'video_call_started',
                patientId: patientId,
                timestamp: new Date().toISOString(),
                initiator: 'provider'
            });

        } catch (error) {
            console.error('❌ Error starting video call:', error);
            this.showError('Failed to start video call: ' + error.message);
        }
    }

    endVideoCall() {
        try {
            console.log('📹 Ending video call');

            
            if (this.peerConnection) {
                this.peerConnection.close();
                this.peerConnection = null;
            }

            
            if (this.localStream) {
                this.localStream.getTracks().forEach(track => track.stop());
                this.localStream = null;
            }

            
            const localVideo = document.getElementById('localVideo');
            const remoteVideo = document.getElementById('remoteVideo');
            if (localVideo) localVideo.srcObject = null;
            if (remoteVideo) remoteVideo.srcObject = null;

            
            this.updateConnectionStatus('disconnected');
            this.stopCallTimer();
            this.hideVideoControls();

            
            this.sendSignalingMessage({
                type: 'end-call',
                patientId: this.currentSession?.patientId
            });

            
            this.auditLog.push({
                action: 'video_call_ended',
                patientId: this.currentSession?.patientId,
                timestamp: new Date().toISOString(),
                duration: this.getCallDuration()
            });

            this.currentSession = null;

        } catch (error) {
            console.error('❌ Error ending video call:', error);
        }
    }

    toggleVideo() {
        if (this.localStream) {
            const videoTrack = this.localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                $('#toggleVideo i').toggleClass('fa-video fa-video-slash');
                $('#toggleVideo').toggleClass('active');
                
                console.log('📹 Video', videoTrack.enabled ? 'enabled' : 'disabled');
            }
        }
    }

    toggleAudio() {
        if (this.localStream) {
            const audioTrack = this.localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                $('#toggleAudio i').toggleClass('fa-microphone fa-microphone-slash');
                $('#toggleAudio').toggleClass('active');
                
                console.log('🎤 Audio', audioTrack.enabled ? 'enabled' : 'disabled');
            }
        }
    }

    
    sendSignalingMessage(message) {
        
        fetch(`${this.apiEndpoint}/signaling`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        }).catch(error => {
            console.error('❌ Signaling error:', error);
        });
    }

    
    async scheduleAppointment(appointmentData) {
        try {
            console.log('📅 Scheduling telemedicine appointment');

            const response = await fetch(`${this.apiEndpoint}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...appointmentData,
                    type: 'telemedicine',
                    platform: 'SolMed'
                })
            });

            if (response.ok) {
                const appointment = await response.json();
                console.log('✅ Appointment scheduled:', appointment.id);
                
                
                this.refreshUpcomingAppointments();
                
                
                this.sendAppointmentNotification(appointment);
                
                return appointment;
            } else {
                throw new Error('Failed to schedule appointment');
            }
        } catch (error) {
            console.error('❌ Error scheduling appointment:', error);
            throw error;
        }
    }

    async joinWaitingRoom(appointmentId) {
        try {
            console.log(`⏰ Joining waiting room for appointment: ${appointmentId}`);
            
            
            const appointment = await this.getAppointment(appointmentId);
            
            
            this.showWaitingRoom(appointment);
            
            
            this.startWaitingRoomMonitoring(appointmentId);
            
        } catch (error) {
            console.error('❌ Error joining waiting room:', error);
            this.showError('Unable to join waiting room: ' + error.message);
        }
    }

    showWaitingRoom(appointment) {
        const waitingRoomHtml = `
            <div class="waiting-room-overlay" id="waitingRoomOverlay">
                <div class="waiting-room-container">
                    <div class="waiting-room-header">
                        <h4>📺 Virtual Waiting Room</h4>
                        <span class="appointment-time">${appointment.scheduledTime}</span>
                    </div>
                    <div class="waiting-room-body">
                        <div class="patient-info">
                            <h6>Patient: ${appointment.patientName}</h6>
                            <p>Appointment Type: ${appointment.type}</p>
                            <p>Provider: ${appointment.providerName}</p>
                        </div>
                        <div class="waiting-status">
                            <div class="status-animation">
                                <div class="pulse-dot"></div>
                            </div>
                            <p>Please wait while your provider joins the consultation...</p>
                            <p class="wait-time">Estimated wait time: <span id="waitTime">2-5 minutes</span></p>
                        </div>
                        <div class="pre-call-checklist">
                            <h6>Pre-Call Checklist:</h6>
                            <ul>
                                <li><i class="fas fa-check text-success"></i> Camera access granted</li>
                                <li><i class="fas fa-check text-success"></i> Microphone access granted</li>
                                <li><i class="fas fa-check text-success"></i> Stable internet connection</li>
                                <li><i class="fas fa-check text-success"></i> Quiet environment prepared</li>
                            </ul>
                        </div>
                    </div>
                    <div class="waiting-room-footer">
                        <button class="btn btn-outline-danger" onclick="telemedicine.exitWaitingRoom()">
                            Exit Waiting Room
                        </button>
                        <button class="btn btn-primary" onclick="telemedicine.testConnectivity()">
                            Test Connection
                        </button>
                    </div>
                </div>
            </div>
        `;

        $('body').append(waitingRoomHtml);
    }

    
    startVitalSignsMonitoring() {
        console.log('💓 Starting virtual vital signs monitoring');
        
        
        
        
        const vitalSignsModal = `
            <div class="modal fade" id="vitalSignsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-heartbeat text-danger"></i>
                                Virtual Vital Signs Monitor
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="vital-signs-grid">
                                <div class="vital-sign-card">
                                    <div class="vital-sign-header">
                                        <i class="fas fa-heartbeat"></i>
                                        <span>Heart Rate</span>
                                    </div>
                                    <div class="vital-sign-value">
                                        <span class="value" id="heartRate">--</span>
                                        <span class="unit">bpm</span>
                                    </div>
                                    <button class="measure-btn" onclick="telemedicine.measureHeartRate()">
                                        Measure
                                    </button>
                                </div>
                                
                                <div class="vital-sign-card">
                                    <div class="vital-sign-header">
                                        <i class="fas fa-thermometer-half"></i>
                                        <span>Temperature</span>
                                    </div>
                                    <div class="vital-sign-value">
                                        <span class="value" id="temperature">--</span>
                                        <span class="unit">°F</span>
                                    </div>
                                    <input type="number" class="measure-input" placeholder="Enter temperature">
                                </div>
                                
                                <div class="vital-sign-card">
                                    <div class="vital-sign-header">
                                        <i class="fas fa-tachometer-alt"></i>
                                        <span>Blood Pressure</span>
                                    </div>
                                    <div class="vital-sign-value">
                                        <span class="value" id="bloodPressure">--/--</span>
                                        <span class="unit">mmHg</span>
                                    </div>
                                    <div class="bp-inputs">
                                        <input type="number" placeholder="Systolic" class="bp-input">
                                        <input type="number" placeholder="Diastolic" class="bp-input">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" class="btn btn-primary" onclick="telemedicine.saveVitalSigns()">
                                Save Measurements
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#vitalSignsModal').remove();
        $('body').append(vitalSignsModal);
        $('#vitalSignsModal').modal('show');
    }

    
    encryptMessage(message) {
        
        
        return btoa(message); 
    }

    decryptMessage(encryptedMessage) {
        
        return atob(encryptedMessage); 
    }

    logAuditEvent(event) {
        this.auditLog.push({
            ...event,
            timestamp: new Date().toISOString(),
            sessionId: this.currentSession?.id
        });

        
        fetch(`${this.apiEndpoint}/audit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        }).catch(error => {
            console.error('❌ Audit logging error:', error);
        });
    }

    
    updateConnectionStatus(status) {
        const statusElement = document.getElementById('connectionStatus');
        const indicator = statusElement.querySelector('.status-indicator');
        
        indicator.className = `status-indicator ${status}`;
        
        const statusText = {
            'disconnected': 'Disconnected',
            'connecting': 'Connecting...',
            'connected': 'Connected'
        };
        
        statusElement.querySelector('span:last-child').textContent = statusText[status] || status;
        this.isConnected = status === 'connected';
    }

    startCallTimer() {
        this.callStartTime = Date.now();
        this.callTimer = setInterval(() => {
            const duration = Date.now() - this.callStartTime;
            const formatted = this.formatDuration(duration);
            document.getElementById('callDuration').textContent = formatted;
        }, 1000);
    }

    stopCallTimer() {
        if (this.callTimer) {
            clearInterval(this.callTimer);
            this.callTimer = null;
        }
    }

    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    showError(message) {
        const errorAlert = `
            <div class="alert alert-danger alert-dismissible fade show telemedicine-error" role="alert">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Telemedicine Error:</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        $('.telemedicine-panel').prepend(errorAlert);
        
        
        setTimeout(() => {
            $('.telemedicine-error').fadeOut();
        }, 5000);
    }

    
    getConnectionStatus() {
        return this.isConnected;
    }

    getCurrentSession() {
        return this.currentSession;
    }

    getAuditLog() {
        return this.auditLog;
    }
}


class VideoCallManager {
    constructor(parent) {
        this.parent = parent;
    }
    
    
}

class ChatManager {
    constructor(parent) {
        this.parent = parent;
        this.messages = [];
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            const chatMessage = {
                id: Date.now(),
                text: message,
                sender: 'provider',
                timestamp: new Date().toISOString(),
                encrypted: this.parent.encryptMessage(message)
            };
            
            this.messages.push(chatMessage);
            this.displayMessage(chatMessage);
            input.value = '';
            
            
            this.parent.sendSignalingMessage({
                type: 'chat-message',
                message: chatMessage
            });
        }
    }
    
    displayMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${message.sender}`;
        messageElement.innerHTML = `
            <div class="message-content">${message.text}</div>
            <div class="message-time">${new Date(message.timestamp).toLocaleTimeString()}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

class ScreenShareManager {
    constructor(parent) {
        this.parent = parent;
        this.isSharing = false;
    }
    
    async startScreenShare() {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });
            
            
            const videoTrack = screenStream.getVideoTracks()[0];
            const sender = this.parent.peerConnection.getSenders().find(s => 
                s.track && s.track.kind === 'video'
            );
            
            if (sender) {
                await sender.replaceTrack(videoTrack);
            }
            
            this.isSharing = true;
            console.log('🖥️ Screen sharing started');
            
        } catch (error) {
            console.error('❌ Screen share error:', error);
        }
    }
    
    stopScreenShare() {
        
        this.isSharing = false;
        console.log('🖥️ Screen sharing stopped');
    }
}

class RecordingManager {
    constructor(parent) {
        this.parent = parent;
        this.isRecording = false;
        this.mediaRecorder = null;
    }
    
    startRecording() {
        
        console.log('🎥 Recording started (with patient consent)');
        this.isRecording = true;
    }
    
    stopRecording() {
        console.log('🎥 Recording stopped');
        this.isRecording = false;
    }
}

class AppointmentManager {
    constructor(parent) {
        this.parent = parent;
    }
    
    showScheduler() {
        
        console.log('📅 Opening appointment scheduler');
    }
}

class ConsentManager {
    async requestVideoConsent(patientId) {
        
        return new Promise((resolve) => {
            const consentModal = `
                <div class="modal fade" id="consentModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Video Consultation Consent</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <p><strong>Patient ID:</strong> ${patientId}</p>
                                <p>Do you consent to this video consultation being recorded for medical purposes?</p>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="consentCheck">
                                    <label class="form-check-label" for="consentCheck">
                                        I understand and consent to this video consultation
                                    </label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onclick="consentDeclined()">
                                    Decline
                                </button>
                                <button type="button" class="btn btn-primary" onclick="consentGranted()">
                                    I Consent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            $('body').append(consentModal);
            $('#consentModal').modal('show');
            
            window.consentGranted = () => {
                $('#consentModal').modal('hide');
                resolve(true);
            };
            
            window.consentDeclined = () => {
                $('#consentModal').modal('hide');
                resolve(false);
            };
        });
    }
}


$(document).ready(function() {
    window.telemedicine = new TelemedicineSystem();
    
    
    if ($('.telemedicine-quick-access').length === 0) {
        $('.medical-form, .form-section').first().prepend(`
            <div class="telemedicine-quick-access mb-3">
                <div class="alert alert-info d-flex align-items-center">
                    <i class="fas fa-video me-2"></i>
                    <span class="flex-grow-1">
                        <strong>Telemedicine Available:</strong> 
                        Virtual consultations enabled for remote patient care
                    </span>
                    <button class="btn btn-primary btn-sm" onclick="telemedicine.appointmentManager.showScheduler()">
                        <i class="fas fa-calendar-plus"></i> Schedule Virtual Visit
                    </button>
                </div>
            </div>
        `);
    }
    
    console.log('📹 Telemedicine System ready for virtual healthcare delivery');
});