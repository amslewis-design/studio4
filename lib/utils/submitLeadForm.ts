export interface SubmitLeadFormResult {
  success: boolean;
  message?: string;
}

/**
 * Submits a lead/contact form to the native /api/leads endpoint (Resend-backed),
 * normalizing the API's success/error response shapes into one result.
 */
export async function submitLeadForm(formData: FormData): Promise<SubmitLeadFormResult> {
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data: { success?: boolean; message?: string; error?: string; details?: string } = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok || data.success !== true) {
    return { success: false, message: data.error || data.message || 'Error' };
  }

  return { success: true, message: data.message };
}
