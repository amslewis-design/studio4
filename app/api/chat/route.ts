import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { PORTFOLIO_PROJECTS } from '@/app/constants/portfolio';

// Initialize Gemini Client
// Note: In a real production app, ensure GOOGLE_API_KEY is set in your environment variables.
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || process.env.API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!process.env.GOOGLE_API_KEY && !process.env.API_KEY) {
       console.warn("Missing API Key for Google GenAI");
       return NextResponse.json(
         { text: "I'm currently running in demo mode (simulated). To enable real AI, please set the GOOGLE_API_KEY environment variable." }, 
         { status: 200 }
       );
    }
    
    // Construct the context from portfolio data
    const projectContext = PORTFOLIO_PROJECTS.map(p => 
      `- ${p.clientName} (${p.location}, ${p.year}): ${p.testimonial} Services: ${p.services.join(', ')}.`
    ).join('\n');

    const systemPrompt = `
      You are the "Concierge AI" for Wanderlust Creative, a high-end digital design agency for the travel industry.
      Your tone is sophisticated, helpful, and concise.
      
      Here is the data about our current portfolio projects:
      ${projectContext}
      
      Answer the user's question based strictly on this information if possible. 
      If asked about services, mention the specific services we provided for these clients.
      If the answer isn't in the data, politely suggest they contact us directly at hello@wanderlust.co.
    `;

    // Proceeding with user's requested model name for the 2026 context.
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' }); 

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\nUser Question: ' + message }] }
      ]
    });

    const response = result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
