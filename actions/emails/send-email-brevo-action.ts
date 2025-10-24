'use server'

import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo'

const brevo_email = 'ramsesoliver1990@gmail.com'

export async function sendEmailBrevoAction(formData: FormData) {
  const botigaid = formData.get('botigaid')?.toString() || ''
  const nom = formData.get('nom')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const concepte = formData.get('concepte')?.toString() || ''
  const missatge = formData.get('missatge')?.toString() || ''

  const brevoApi = new TransactionalEmailsApi();
  brevoApi.setApiKey(0, process.env.BREVO_API_KEY!)

  // Crear l'objecte d'email amb valors per defecte
  const emailOptions = new SendSmtpEmail()
  emailOptions.sender = {
    email: brevo_email, //abans ---> formData.get('email')?.toString() || '',
    name: "Ampara App",
  }
  emailOptions.to = [{
    email: formData.get('recipient')?.toString() || '',
  }];
  emailOptions.subject = `Formulari de contacte: ${concepte}`;
  emailOptions.htmlContent = `
    <p>Este email s'ha enviat des del formulari de contacte d'Ampara App:</p>
    <p><strong>Nom:</strong> ${nom}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Concepte:</strong> ${concepte}</p>
    <p><strong>Missatge:</strong> ${missatge}</p>
  `
  try {
    await brevoApi.sendTransacEmail(emailOptions)
    return { success: true, message: 'Missatge enviat correctament!' }
  } catch (error) {
    console.error('Error enviant amb Brevo:', error)
    return { 
      success: false, 
      message: 'Error en enviar el missatge' 
    }
  }
}