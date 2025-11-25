import nodemailer from 'nodemailer';

const createTransporter = () => {
    return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

export const sendContactConfirmation = async (contactData) => {
    const transporter = createTransporter();

    const serviceLabels = {
        'civil-litigation': 'Civil & Commercial Litigation',
        'constitutional-admin': 'Constitutional & Administrative Law',
        'corporate-commercial': 'Corporate & Commercial Law',
        'labor-employment': 'Employment & Labour Law',
        'debt-collection': 'Debt Collection & Recovery',
        'aviation-law': 'Aviation Law',
        'investigations': 'Investigations',
        'local-government': 'Local Government Law',
        'property-real-estate': 'Real Estate & Property Law',
        'criminal-law': 'Criminal Law & Litigation',
        'other': 'Other Legal Service'
    };

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: contactData.email,
        subject: 'Thank You for Contacting GS Inc. Attorneys',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #1a3a6c; margin-bottom: 10px;">GS Inc. Attorneys</h2>
          <p style="color: #6c757d; font-size: 14px;">Legal Excellence Since 2011</p>
        </div>
        
        <h3 style="color: #1a3a6c;">Thank You for Contacting Us</h3>
        <p>Dear ${contactData.name},</p>
        <p>We have received your inquiry and our legal team will review it shortly. We aim to respond to all inquiries within 24 hours.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h4 style="color: #1a3a6c; margin-top: 0;">Your Inquiry Details:</h4>
          <p><strong>Service:</strong> ${serviceLabels[contactData.service] || contactData.service}</p>
          <p><strong>Message:</strong> ${contactData.message}</p>
        </div>
        
        <p>If you have any urgent matters, please don't hesitate to call us at <strong>+27 869 1121</strong>.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="margin-bottom: 5px;"><strong>GS Inc. Attorneys</strong></p>
          <p style="margin: 0; color: #6c757d; font-size: 14px;">
            8 Du Plessis Road, Alberton<br>
            26 Ernest Oppenheimer Avenue, Bruma, Johannesburg<br>
            Tel: +27 869 1121 | Email: shimane@gsi-attorneys.co.za
          </p>
        </div>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Contact confirmation email sent to client');
        return true;
    } catch (error) {
        console.error('Error sending contact confirmation email:', error);
        return false;
    }
};

export const sendAppointmentConfirmation = async (appointmentData) => {
    const transporter = createTransporter();

    const serviceLabels = {
        'civil-litigation': 'Civil & Commercial Litigation',
        'constitutional-admin': 'Constitutional & Administrative Law',
        'corporate-commercial': 'Corporate & Commercial Law',
        'labor-employment': 'Employment & Labour Law',
        'debt-collection': 'Debt Collection & Recovery',
        'aviation-law': 'Aviation Law',
        'investigations': 'Investigations',
        'local-government': 'Local Government Law',
        'property-real-estate': 'Real Estate & Property Law',
        'criminal-law': 'Criminal Law & Litigation',
        'consultation': 'General Consultation'
    };

    const attorneyLabels = {
        'julius': 'Julius Galananzhele',
        'shimane': 'Shimane Sebela',
        'any': 'Any Available Attorney'
    };

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: appointmentData.email,
        subject: 'Appointment Request Received - GS Inc. Attorneys',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #1a3a6c; margin-bottom: 10px;">GS Inc. Attorneys</h2>
          <p style="color: #6c757d; font-size: 14px;">Legal Excellence Since 2011</p>
        </div>
        
        <h3 style="color: #1a3a6c;">Appointment Request Received</h3>
        <p>Dear ${appointmentData.name},</p>
        <p>We have received your appointment request and will contact you shortly to confirm the details.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h4 style="color: #1a3a6c; margin-top: 0;">Appointment Details:</h4>
          <p><strong>Service:</strong> ${serviceLabels[appointmentData.service] || appointmentData.service}</p>
          <p><strong>Preferred Date:</strong> ${new Date(appointmentData.preferredDate).toLocaleDateString()}</p>
          <p><strong>Preferred Time:</strong> ${appointmentData.preferredTime}</p>
          <p><strong>Duration:</strong> ${appointmentData.duration}</p>
          <p><strong>Meeting Type:</strong> ${appointmentData.meetingType}</p>
          <p><strong>Preferred Attorney:</strong> ${attorneyLabels[appointmentData.preferredAttorney] || appointmentData.preferredAttorney || 'Any Available Attorney'}</p>
          ${appointmentData.message ? `<p><strong>Additional Notes:</strong> ${appointmentData.message}</p>` : ''}
        </div>
        
        <p><strong>Next Steps:</strong> Our team will contact you within 24 hours to confirm your appointment. If you need to make any changes, please call us at <strong>+27 869 1121</strong>.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="margin-bottom: 5px;"><strong>GS Inc. Attorneys</strong></p>
          <p style="margin: 0; color: #6c757d; font-size: 14px;">
            8 Du Plessis Road, Alberton<br>
            26 Ernest Oppenheimer Avenue, Bruma, Johannesburg<br>
            Tel: +27 869 1121 | Email: shimane@gsi-attorneys.co.za
          </p>
        </div>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Appointment confirmation email sent to client');
        return true;
    } catch (error) {
        console.error('Error sending appointment confirmation email:', error);
        return false;
    }
};

export const sendInternalNotification = async (type, data) => {
    const transporter = createTransporter();

    const serviceLabels = {
        'civil-litigation': 'Civil & Commercial Litigation',
        'constitutional-admin': 'Constitutional & Administrative Law',
        'corporate-commercial': 'Corporate & Commercial Law',
        'labor-employment': 'Employment & Labour Law',
        'debt-collection': 'Debt Collection & Recovery',
        'aviation-law': 'Aviation Law',
        'investigations': 'Investigations',
        'local-government': 'Local Government Law',
        'property-real-estate': 'Real Estate & Property Law',
        'criminal-law': 'Criminal Law & Litigation',
        'consultation': 'General Consultation',
        'other': 'Other Legal Service'
    };

    const subject = type === 'contact'
        ? 'New Contact Form Submission - GS Inc. Attorneys'
        : 'New Appointment Request - GS Inc. Attorneys';

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_ADMIN,
        subject: subject,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a3a6c;">${subject}</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #1a3a6c; margin-top: 0;">Client Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Service:</strong> ${serviceLabels[data.service] || data.service}</p>
          
          ${type === 'appointment' ? `
            <p><strong>Preferred Date:</strong> ${new Date(data.preferredDate).toLocaleDateString()}</p>
            <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
            <p><strong>Duration:</strong> ${data.duration}</p>
            <p><strong>Meeting Type:</strong> ${data.meetingType}</p>
            <p><strong>Preferred Attorney:</strong> ${data.preferredAttorney || 'any'}</p>
          ` : ''}
          
          <p><strong>Message:</strong> ${data.message}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <p><strong>Action Required:</strong> Please review this ${type === 'contact' ? 'inquiry' : 'appointment request'} in the admin dashboard and respond to the client promptly.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #6c757d; font-size: 14px;">
            This is an automated notification from GS Inc. Attorneys backend system.
          </p>
        </div>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Internal notification email sent to law firm');
        return true;
    } catch (error) {
        console.error('Error sending internal notification email:', error);
        return false;
    }
};