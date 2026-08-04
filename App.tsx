import React, { useState, useEffect, useRef, useCallback } from 'react'
import logoImg from '@/imports/WhatsApp_Image_2026-08-01_at_17.51.33-removebg-preview.png'

// ─── SVG Icon System ──────────────────────────────────────────────────────────
const s = (d: string, rest?: string) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
    className={rest}>{d.split('|').map((p,i)=><path key={i} d={p}/>)}</svg>
)

const Icon = {
  // Practice areas
  corporate:   () => s('M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z|M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'),
  litigation:  () => s('M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z'),
  finance:     () => s('M23 6l-9.5 9.5-5-5L1 18|M17 6h6v6'),
  property:    () => s('M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10'),
  family:      () => s('M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'),
  business:    () => s('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8'),
  employment:  () => s('M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'),
  ip:          () => s('M9 18h6|M10 22h4|M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14'),
  compliance:  () => s('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'),
  // Why choose
  excellence:  () => s('M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'),
  strategic:   () => s('M12 22V12|M12 12l-4-4|M12 12l4-4|M4.93 4.93l4.24 4.24|M14.83 14.83l4.24 4.24|M2 12h4|M18 12h4|M4.93 19.07l4.24-4.24|M14.83 9.17l4.24-4.24'),
  clientfocus: () => s('M22 11.08V12a10 10 0 1 1-5.93-9.14|M22 4L12 14.01l-3-3'),
  commercial:  () => s('M18 20V10|M12 20V4|M6 20v-6'),
  integrity:   () => s('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z|M9 12l2 2 4-4'),
  global:      () => s('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z|M2 12h20|M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'),
  // Industries
  bank:        () => s('M3 22h18|M3 7l9-5 9 5|M5 7v14|M9 7v14|M15 7v14|M19 7v14|M2 22h20'),
  code:        () => s('M16 18l6-6-6-6|M8 6l-6 6 6 6'),
  building2:   () => s('M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z|M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2|M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2|M10 6h4|M10 10h4|M10 14h4|M10 18h4'),
  zap:         () => s('M13 2L3 14h9l-1 8 10-12h-9l1-8z'),
  heartPulse:  () => s('M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z|M3.22 12H9.5l1.5-3 2 6 1.5-3h5.27'),
  film:        () => s('M19.82 2H4.18A2.18 2.18 0 0 0 2 4.18v15.64A2.18 2.18 0 0 0 4.18 22h15.64A2.18 2.18 0 0 0 22 19.82V4.18A2.18 2.18 0 0 0 19.82 2z|M7 2v20|M17 2v20|M2 12h20|M2 7h5|M2 17h5|M17 17h5|M17 7h5'),
  factory:     () => s('M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z'),
  handshake:   () => s('M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z'),
  // Contact
  mapPin:      () => s('M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z|M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'),
  phone:       () => s('M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.3a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.5h3a2 2 0 0 1 2 1.72c.13.96.33 1.9.6 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6.09 6.09l1.36-1.35a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.6A2 2 0 0 1 22 16.92z'),
  mail:        () => s('M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z|M22 6l-10 7L2 6'),
  whatsapp:    () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  ),
  // Misc
  target:      () => s('M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z|M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'),
  calendar:    () => s('M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z|M16 2v4|M8 2v4|M3 10h18'),
  chat:        () => s('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'),
  bot:         () => s('M12 8V4H8|M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z|M2 14s0-1 1-2a7 7 0 0 1 3-1|M22 14s0-1-1-2a7 7 0 0 0-3-1|M9 18l-2 3|M15 18l2 3|M10 12v.01|M14 12v.01'),
  checkCircle: () => s('M22 11.08V12a10 10 0 1 1-5.93-9.14|M22 4L12 14.01l-3-3'),
  cookie:      () => s('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z|M12 8h.01|M8 12h.01|M16 12h.01|M12 16h.01'),
  linkedin:    () => s('M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z|M2 9h4v12H2z|M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'),
  twitter:     () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  instagram:   () => s('M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z|M17.5 6.5h.01|M7.5 1.5h9a6 6 0 0 1 6 6v9a6 6 0 0 1-6 6h-9a6 6 0 0 1-6-6v-9a6 6 0 0 1 6-6z'),
  star:        () => s('M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'),
  lock:        () => s('M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z|M7 11V7a5 5 0 0 1 10 0v4'),
  puzzle:      () => s('M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z|M7 7h.01'),
  award:       () => s('M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z|M8.21 13.89L7 23l5-3 5 3-1.21-9.12'),
  compass:     () => s('M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z'),
  arrowRight:  () => s('M5 12h14|M12 5l7 7-7 7'),
  chevronDown: () => s('M6 9l6 6 6-6'),
  x:           () => s('M18 6L6 18|M6 6l12 12'),
  menu:        () => s('M3 12h18|M3 6h18|M3 18h18'),
  send:        () => s('M22 2L11 13|M22 2l-7 20-4-9-9-4 20-7z'),
  sparkle:     () => s('M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z'),
  briefcase:   () => s('M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z|M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2'),
  eye:         () => s('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z|M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'),
  scale:       () => s('M12 3l2.5 5h5l-4 4 1.5 5L12 14l-5 3 1.5-5-4-4h5z|M5 3h14|M12 3v2'),
}

// ─── Image URLs ───────────────────────────────────────────────────────────────
const IMG = {
  hero:    'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=1920&h=1080&fit=crop&auto=format',
  boardroom:'https://images.unsplash.com/photo-1739298061707-cefee19941b7?w=1920&h=900&fit=crop&auto=format',
  meeting: 'https://images.unsplash.com/photo-1573166364839-1bfe9196c23e?w=1200&h=800&fit=crop&auto=format',
  team:    'https://images.unsplash.com/photo-1573497161249-42447f9f6706?w=1200&h=800&fit=crop&auto=format',
  consult: 'https://images.unsplash.com/photo-1759310610552-914069ec2e0b?w=1200&h=800&fit=crop&auto=format',
  building:'https://images.unsplash.com/photo-1785094165691-643aa8db87ca?w=1200&h=800&fit=crop&auto=format',
  lawyer1: 'https://images.unsplash.com/photo-1578758803946-2c4f6738df87?w=600&h=750&fit=crop&auto=format',
  lawyer2: 'https://images.unsplash.com/photo-1617244147299-5ef406921c35?w=600&h=750&fit=crop&auto=format',
  lawyer3: 'https://images.unsplash.com/photo-1616805384781-fdcdf0328348?w=600&h=750&fit=crop&auto=format',
  lawyer4: 'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=600&h=750&fit=crop&auto=format',
  lawyer5: 'https://images.unsplash.com/photo-1578758837674-93ed0ab5fbab?w=600&h=750&fit=crop&auto=format',
  lawyer6: 'https://images.unsplash.com/photo-1613186145425-5bb4eca455d7?w=600&h=750&fit=crop&auto=format',
  office:  'https://images.unsplash.com/photo-1739298061740-5ed03045b280?w=1200&h=800&fit=crop&auto=format',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRACTICE_AREAS = [
  { slug:'corporate-commercial',  title:'Corporate & Commercial Law',      Icon: Icon.corporate,  short:'Helping businesses establish, structure, transact, and grow with confidence.',                                    services:['Corporate formation & restructuring','Shareholders\' agreements','Commercial contracts','Joint ventures & mergers','Corporate governance','Due diligence','Business acquisitions','Corporate advisory'],     faq:[{q:'What is corporate law?',a:'Corporate law governs the formation, operation, and dissolution of business entities. It covers contracts, governance, compliance, and transactions essential to business operations.'},{q:'Do I need a lawyer to register a company?',a:'While not legally required, a lawyer ensures proper structuring, compliance with CAC requirements, and that your constitutional documents protect your interests from the start.'}] },
  { slug:'litigation-dispute',    title:'Litigation & Dispute Resolution', Icon: Icon.litigation,  short:'Strong representation and strategic dispute management when conflicts arise.',                                    services:['Civil & criminal litigation','Commercial disputes','Contract disputes','Property disputes','Debt recovery','Employment disputes','Negotiation & mediation','Arbitration & appeals'],                        faq:[{q:'When should I hire a litigation lawyer?',a:'Engage a litigation lawyer as early as possible when a dispute arises — ideally before any formal claims are filed — so strategy can be planned from the outset.'},{q:'What is alternative dispute resolution?',a:'ADR includes negotiation, mediation, and arbitration — structured ways to resolve disputes outside court, often faster and more cost-effective for commercial matters.'}] },
  { slug:'finance-investment',    title:'Finance & Investment',            Icon: Icon.finance,    short:'Legal support for investors, businesses, financing arrangements, and investment transactions.',                    services:['Investment agreements','Loan documentation','Financing arrangements','Security documentation','Share subscription agreements','Investment due diligence','Venture capital transactions','Debt restructuring'], faq:[{q:'What legal documents do investors require?',a:'Investors typically require term sheets, shareholders\' agreements, subscription agreements, information rights clauses, and anti-dilution provisions — all requiring careful legal review.'}] },
  { slug:'property-real-estate',  title:'Property & Real Estate',          Icon: Icon.property,   short:'Protecting interests in property acquisition, development, transactions, and disputes.',                           services:['Property acquisition','Title investigation','Deeds & leases','Tenancy agreements','Property development','Mortgages','Real estate transactions','Property disputes','Joint venture arrangements'],              faq:[{q:'What is title investigation?',a:'Title investigation verifies that a property seller has valid legal title and that there are no encumbrances, disputes, or government acquisitions affecting the property before you purchase.'}] },
  { slug:'family-law',            title:'Family Law',                      Icon: Icon.family,     short:'Discreet, compassionate, and professional counsel on sensitive family matters.',                                   services:['Matrimonial matters','Divorce proceedings','Child custody & maintenance','Adoption','Family property disputes','Wills & succession','Probate & estate administration'],                                      faq:[{q:'Is family law handled confidentially?',a:'Absolutely. All family law matters at Gazelle Associate are handled with the highest degree of discretion and professional confidentiality.'}] },
  { slug:'business-administrative',title:'Business & Administrative Law',   Icon: Icon.business,   short:'Helping businesses and individuals navigate regulatory and administrative environments.',                           services:['Regulatory compliance','Licensing & permits','Administrative decisions','Government contracts','Public procurement','Regulatory investigations','Administrative disputes'],                                  faq:[{q:'What is administrative law?',a:'Administrative law governs the relationship between citizens and government bodies — including licensing, regulatory compliance, and challenging administrative decisions.'}] },
  { slug:'employment-labour',     title:'Employment & Labour',             Icon: Icon.employment,  short:'We advise employers and employees on all workplace legal matters.',                                                services:['Employment contracts','HR policies & handbooks','Employee disputes','Termination & redundancy','Workplace compliance','Employment litigation'],                                                               faq:[{q:'Do you advise both employers and employees?',a:'Yes. We advise both employers seeking to ensure workplace compliance and employees dealing with unfair dismissal, contract disputes, and workplace rights.'}] },
  { slug:'ip-technology',         title:'Intellectual Property & Technology',Icon: Icon.ip,        short:'Assisting businesses in protecting and managing intellectual assets in a digital economy.',                        services:['Trademark matters','Copyright protection','IP licensing','Technology agreements','Software contracts','Data protection','Digital business advisory'],                                                         faq:[{q:'How do I protect my brand in Nigeria?',a:'Brand protection begins with trademark registration at the Trademarks Registry. We guide businesses through the application, prosecution, and enforcement process.'}] },
  { slug:'regulatory-compliance', title:'Regulatory Compliance',           Icon: Icon.compliance,  short:'Navigating Nigeria\'s evolving regulatory landscape across sectors and industries.',                               services:['Sector compliance audits','Regulatory filings','Compliance policies','Regulatory liaison','AML & KYC compliance','Data privacy compliance','Environmental regulations'],                                        faq:[{q:'Why does regulatory compliance matter?',a:'Non-compliance exposes businesses to penalties, licence revocation, and reputational damage. A structured compliance programme protects your business and builds investor confidence.'}] },
]

const TEAM = [
  { name:'Adaora Okonkwo',      title:'Managing Partner',  img:IMG.lawyer1, expertise:['Corporate & Commercial Law','Finance & Investment','Corporate Governance'],    summary:'Adaora leads Gazelle Associate with over 15 years of experience advising corporations, investors, and financial institutions across Nigeria\'s most complex commercial transactions.',  education:'LLB (Hons), University of Lagos | LLM, University of Lagos | BL, Nigerian Law School', languages:'English, Igbo' },
  { name:'Emeka Chukwuemeka',   title:'Senior Associate',  img:IMG.lawyer2, expertise:['Litigation & Dispute Resolution','Commercial Disputes','Criminal Defence'],     summary:'Emeka is a seasoned litigator with a track record of representing clients in the Federal High Court, Court of Appeal, and Supreme Court.',                                              education:'LLB (Hons), University of Ibadan | BL, Nigerian Law School',                           languages:'English, Yoruba, Igbo' },
  { name:'Zainab Aliyu',        title:'Associate',         img:IMG.lawyer3, expertise:['Property & Real Estate','Business Law','Regulatory Compliance'],               summary:'Zainab brings meticulous attention to detail and deep knowledge of Nigerian property law. She advises developers, investors, and individuals on property transactions and title matters.',  education:'LLB (Hons), Ahmadu Bello University | BL, Nigerian Law School',                        languages:'English, Hausa' },
  { name:'Olumide Fashola',     title:'Associate',         img:IMG.lawyer4, expertise:['Employment & Labour','Corporate Law','Intellectual Property'],                 summary:'Olumide advises organisations on employment law, workplace compliance, and intellectual property matters. He has assisted several tech startups in structuring their employment frameworks.', education:'LLB (Hons), Obafemi Awolowo University | BL, Nigerian Law School',                    languages:'English, Yoruba' },
  { name:'Fatima Bello',        title:'Associate',         img:IMG.lawyer5, expertise:['Family Law','Estate Planning','Probate'],                                      summary:'Fatima handles sensitive family law matters with compassion, discretion, and professional rigour. She advises on matrimonial disputes, child-related matters, estate planning, and probate.', education:'LLB (Hons), University of Abuja | BL, Nigerian Law School',                            languages:'English, Hausa, French' },
  { name:'Ngozi Obi',           title:'Associate',         img:IMG.lawyer6, expertise:['Finance & Investment','Fintech Law','Regulatory Compliance'],                  summary:'Ngozi specialises in financial regulation, fintech law, and investment transactions, advising financial institutions, fintech companies, and investors on CBN and SEC compliance.',          education:'LLB, University of Nigeria Nsukka | LLM (Finance), UCL | BL, Nigerian Law School',    languages:'English, Igbo' },
]

const INSIGHTS = [
  { slug:'five-legal-mistakes',       title:'5 Legal Mistakes That Can Put a Growing Business at Risk',                    category:'Corporate Law',         date:'18 July 2026', readTime:'6 min', img:IMG.meeting,   excerpt:'Many Nigerian businesses fail to protect themselves legally during their growth phase. Here are five critical legal oversights that can expose your business to serious liability.',      content:'As businesses scale in Nigeria, legal vulnerabilities that seemed manageable at the startup stage can become existential threats. The five most common mistakes are: inadequate shareholder agreements, poorly drafted commercial contracts, failure to protect intellectual property, non-compliance with regulatory requirements, and inadequate employment documentation. Addressing these early protects your business, your investors, and your future.' },
  { slug:'what-founders-should-know', title:'What Every Nigerian Founder Should Know Before Bringing in an Investor',       category:'Finance & Investment',  date:'10 July 2026', readTime:'8 min', img:IMG.consult,   excerpt:'Investment can transform a business — or create serious complications. Understanding the legal dimensions of investment is essential before you sign any term sheet.',                      content:'When a founder accepts investment, they are entering into a legal relationship that will shape their business for years. Before signing anything, founders must understand valuation and dilution, shareholder rights and controls, board composition provisions, anti-dilution clauses, drag-along and tag-along rights, and exit mechanisms. These are not just financial terms — they are legal commitments with long-term consequences.' },
  { slug:'corporate-governance',      title:'Why Corporate Governance Matters Beyond Compliance',                           category:'Corporate Law',         date:'02 July 2026', readTime:'5 min', img:IMG.boardroom, excerpt:'Corporate governance is not just a regulatory checkbox. For Nigerian businesses seeking investment, growth, and long-term sustainability, good governance is a competitive advantage.',  content:'Good corporate governance builds investor confidence, reduces internal conflict, and enables faster decision-making. Companies with clear board structures, documented policies, and transparent financial reporting consistently attract better capital on better terms.' },
  { slug:'buying-property-nigeria',   title:'Buying Property in Nigeria: Key Legal Issues to Consider',                    category:'Property & Real Estate',date:'25 June 2026', readTime:'7 min', img:IMG.building,  excerpt:'Property transactions in Nigeria carry significant legal risks that can be avoided with proper due diligence. What you need to know before you buy.',                                      content:'Property acquisition in Nigeria requires careful legal due diligence. Key issues include title investigation, checking for government acquisition notices, verifying survey plans, reviewing mortgages or encumbrances, and understanding the Governor\'s Consent process. Skipping these steps can result in losing both your money and the property.' },
  { slug:'contracts-and-growth',      title:'Contracts and Business Growth: Why the Fine Print Matters',                   category:'Corporate Law',         date:'15 June 2026', readTime:'5 min', img:IMG.team,      excerpt:'Commercial contracts are the legal foundation of every business relationship. Understanding what you are signing can protect your business from significant financial exposure.',         content:'Every business relationship is governed by contract. Nigerian businesses often sign commercial agreements without legal review, exposing themselves to unfavourable payment terms, unlimited liability, unenforceable dispute resolution clauses, and inadequate protection for their intellectual property.' },
  { slug:'regulatory-compliance',     title:'What Businesses Should Know About Regulatory Compliance in Nigeria',          category:'Compliance',            date:'05 June 2026', readTime:'6 min', img:IMG.office,    excerpt:'Nigeria\'s regulatory environment is complex and constantly evolving. Understanding your compliance obligations is essential to protect your business and avoid significant penalties.',  content:'Nigerian businesses operate within a web of regulatory requirements from the CAC, FIRS, CBN, SEC, NAFDAC, NCC, and sector-specific regulators. Non-compliance can result in fines, licence revocation, director liability, and reputational damage.' },
]

// ─── Utility: useReveal ────────────────────────────────────────────────────────
function useReveal(cls = 'reveal') {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [cls])
  return ref
}

// ─── Icon Badge ────────────────────────────────────────────────────────────────
function IconBadge({ Icon: I, size = 'md' }: { Icon: () => React.ReactElement; size?: 'sm'|'md'|'lg' }) {
  const dim = size === 'lg' ? 'w-16 h-16' : size === 'sm' ? 'w-9 h-9' : 'w-12 h-12'
  return (
    <div className={`${dim} rounded-2xl flex items-center justify-center icon-wrap flex-shrink-0`}
      style={{ background: '#eeeef8', color: '#3E3D7C' }}>
      <I />
    </div>
  )
}

// ─── Booking Modal ────────────────────────────────────────────────────────────
function BookingModal({ onClose, initialArea = '' }: { onClose: () => void; initialArea?: string }) {
  const [step, setStep] = useState(1)
  const [area, setArea] = useState(initialArea)
  const [meetingType, setMeetingType] = useState('')
  const [lawyer, setLawyer] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [org, setOrg] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string,string>>({})

  const steps = ['Practice Area','Meeting Type','Select Lawyer','Date & Time','Your Details','Confirm']
  const canNext = () => { if(step===1) return !!area; if(step===2) return !!meetingType; if(step===3) return !!lawyer; if(step===4) return !!date&&!!time; return true }
  const validate5 = () => {
    const e: Record<string,string> = {}
    if (!name.trim()) e.name = 'Required'
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Valid email required'
    if (!phone.trim()) e.phone = 'Required'
    setErrors(e); return Object.keys(e).length === 0
  }
  const handleNext = () => { if(step===5 && !validate5()) return; if(step===6){setSubmitted(true);return}; setStep(s=>Math.min(s+1,6)) }

  const mtOptions = [
    { id:'virtual', label:'Virtual Meeting', desc:'Video call via Zoom or Google Meet', Icon: Icon.eye },
    { id:'office',  label:'Office Visit',    desc:'In-person at our Lagos office',        Icon: Icon.building2 },
    { id:'phone',   label:'Phone Call',      desc:'We call you at your preferred time',    Icon: Icon.phone },
  ]

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{background:'rgba(26,26,46,0.88)'}} onClick={onClose}>
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col anim-scale-in" onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 flex-shrink-0" style={{background:'#3E3D7C'}}>
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-indigo-200 mb-1">Gazelle Associate</p>
            <h2 className="text-xl text-white font-serif">Book a Consultation</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <Icon.x />
          </button>
        </div>

        {!submitted ? (
          <>
            {/* Progress */}
            <div className="px-8 pt-4 pb-2 flex-shrink-0">
              <div className="flex gap-1">
                {steps.map((_,i) => (
                  <div key={i} className="flex-1 h-1 rounded-full transition-all duration-500"
                    style={{background: i<step ? '#3E3D7C' : '#eeeef8'}} />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Step {step} of 6 — <span className="font-semibold text-gray-600">{steps[step-1]}</span></p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-8 py-5" key={step} style={{animation:'fadeUp 0.3s ease both'}}>
              {step===1 && (
                <div>
                  <h3 className="font-serif text-lg mb-4" style={{color:'#1a1a2e'}}>Which practice area relates to your matter?</h3>
                  <div className="grid gap-2">
                    {PRACTICE_AREAS.map(pa => (
                      <button key={pa.slug} onClick={()=>setArea(pa.title)}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium group"
                        style={{borderColor:area===pa.title?'#3E3D7C':'#e5e5f0', background:area===pa.title?'#eeeef8':'white', color:area===pa.title?'#3E3D7C':'#1a1a2e'}}>
                        <span style={{color:area===pa.title?'#3E3D7C':'#9291a5'}}><pa.Icon /></span>
                        {pa.title}
                        {area===pa.title && <span className="ml-auto"><Icon.checkCircle /></span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step===2 && (
                <div>
                  <h3 className="font-serif text-lg mb-4" style={{color:'#1a1a2e'}}>How would you like to meet?</h3>
                  <div className="grid gap-3">
                    {mtOptions.map(opt => (
                      <button key={opt.id} onClick={()=>setMeetingType(opt.id)}
                        className="flex items-start gap-4 text-left px-5 py-4 rounded-xl border-2 transition-all duration-200"
                        style={{borderColor:meetingType===opt.id?'#3E3D7C':'#e5e5f0', background:meetingType===opt.id?'#eeeef8':'white'}}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{background:meetingType===opt.id?'#3E3D7C':'#f5f5f8', color:meetingType===opt.id?'white':'#3E3D7C'}}>
                          <opt.Icon />
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{color:meetingType===opt.id?'#3E3D7C':'#1a1a2e'}}>{opt.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step===3 && (
                <div>
                  <h3 className="font-serif text-lg mb-4" style={{color:'#1a1a2e'}}>Choose your lawyer</h3>
                  <div className="grid gap-3">
                    {TEAM.map(t => (
                      <button key={t.name} onClick={()=>setLawyer(t.name)}
                        className="flex items-center gap-4 text-left px-5 py-3 rounded-xl border-2 transition-all duration-200"
                        style={{borderColor:lawyer===t.name?'#3E3D7C':'#e5e5f0', background:lawyer===t.name?'#eeeef8':'white'}}>
                        <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm" style={{color:lawyer===t.name?'#3E3D7C':'#1a1a2e'}}>{t.name}</p>
                          <p className="text-xs text-gray-500">{t.title}</p>
                        </div>
                        {lawyer===t.name && <span style={{color:'#3E3D7C'}}><Icon.checkCircle /></span>}
                      </button>
                    ))}
                    <button onClick={()=>setLawyer('No preference')}
                      className="flex items-center gap-4 text-left px-5 py-3 rounded-xl border-2 transition-all duration-200"
                      style={{borderColor:lawyer==='No preference'?'#3E3D7C':'#e5e5f0', background:lawyer==='No preference'?'#eeeef8':'white'}}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{background:'#eeeef8', color:'#3E3D7C'}}>
                        <Icon.target />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{color:lawyer==='No preference'?'#3E3D7C':'#1a1a2e'}}>No preference</p>
                        <p className="text-xs text-gray-500">We will assign the best-suited lawyer</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {step===4 && (
                <div>
                  <h3 className="font-serif text-lg mb-4" style={{color:'#1a1a2e'}}>Select date and time</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[{label:'Preferred Date', node:<input type="date" value={date} onChange={e=>setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full border-2 rounded-xl px-4 py-3 text-sm outline-none" style={{borderColor:date?'#3E3D7C':'#e5e5f0'}} />},
                      {label:'Preferred Time', node:<select value={time} onChange={e=>setTime(e.target.value)} className="w-full border-2 rounded-xl px-4 py-3 text-sm outline-none appearance-none" style={{borderColor:time?'#3E3D7C':'#e5e5f0'}}>
                        <option value="">Select a time</option>
                        {['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM'].map(t=><option key={t}>{t}</option>)}
                      </select>}
                    ].map(({label, node}) => (
                      <div key={label}>
                        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">{label}</label>
                        {node}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4">Business hours: Monday – Friday, 9:00 AM – 5:00 PM WAT.</p>
                </div>
              )}

              {step===5 && (
                <div>
                  <h3 className="font-serif text-lg mb-4" style={{color:'#1a1a2e'}}>Your details</h3>
                  <div className="grid gap-4">
                    {[{label:'Full Name *', key:'name', type:'text', val:name, set:setName},{label:'Email Address *',key:'email',type:'email',val:email,set:setEmail},{label:'Phone Number *',key:'phone',type:'tel',val:phone,set:setPhone},{label:'Organisation (Optional)',key:'org',type:'text',val:org,set:setOrg}].map(({label,key,type,val,set})=>(
                      <div key={key}>
                        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">{label}</label>
                        <input type={type} value={val} onChange={e=>set(e.target.value)} className="w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                          style={{borderColor:errors[key]?'#ef4444':val?'#3E3D7C':'#e5e5f0'}} />
                        {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 leading-relaxed p-3 rounded-xl" style={{background:'#f5f5f8'}}>
                      Submitting this form does not automatically create a lawyer-client relationship.
                    </p>
                  </div>
                </div>
              )}

              {step===6 && (
                <div>
                  <h3 className="font-serif text-lg mb-4" style={{color:'#1a1a2e'}}>Confirm your booking</h3>
                  <div className="rounded-2xl p-5 space-y-3" style={{background:'#f5f5f8'}}>
                    {[{l:'Practice Area',v:area},{l:'Meeting Type',v:meetingType==='virtual'?'Virtual':meetingType==='office'?'Office Visit':'Phone Call'},{l:'Lawyer',v:lawyer},{l:'Date',v:date},{l:'Time',v:time},{l:'Name',v:name},{l:'Email',v:email},{l:'Phone',v:phone},...(org?[{l:'Organisation',v:org}]:[])].map(({l,v})=>(
                      <div key={l} className="flex justify-between text-sm">
                        <span className="text-gray-500">{l}</span>
                        <span className="font-semibold text-right ml-4" style={{color:'#1a1a2e'}}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
              <button onClick={()=>setStep(s=>Math.max(s-1,1))} disabled={step===1} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-30" style={{color:'#3E3D7C'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Back
              </button>
              <button onClick={handleNext} disabled={!canNext()} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 hover:scale-105"
                style={{background:'#3E3D7C'}}>
                {step===6?'Confirm Booking':'Continue'}
                <Icon.arrowRight />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-center anim-fade-up">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{background:'#eeeef8',color:'#3E3D7C'}}>
              <Icon.checkCircle />
            </div>
            <h3 className="text-2xl font-serif mb-3" style={{color:'#3E3D7C'}}>Booking Confirmed</h3>
            <p className="text-gray-600 text-sm max-w-sm leading-relaxed mb-6">Thank you, {name}. We have received your consultation request and will send confirmation to <strong>{email}</strong> within 24 hours.</p>
            <button onClick={onClose} className="px-8 py-3 rounded-xl text-sm font-semibold text-white" style={{background:'#3E3D7C'}}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Chat Panel ───────────────────────────────────────────────────────────────
type ChatMsg = { role:'user'|'bot'; text:string }
const CHAT_ANSWERS: Record<string,string> = {
  practice: 'We offer 9 practice areas: Corporate & Commercial, Litigation & Dispute Resolution, Finance & Investment, Property & Real Estate, Family Law, Business & Administrative, Employment & Labour, Intellectual Property & Technology, and Regulatory Compliance.',
  consult:  'You can book a consultation through our website. Choose your practice area, meeting type, select a lawyer, and pick a time. We respond within 24 hours.',
  location: 'Gazelle Associate is based in Lagos, Nigeria. We serve clients across Nigeria and, through professional networks, internationally.',
  hours:    'Our office is open Monday to Friday, 9:00 AM – 5:00 PM (WAT). For urgent matters, WhatsApp us at +234 703 424 0634.',
  careers:  'We welcome applications for internships, placements, associate positions, and experienced professionals. Email careers@gazelleassociate.com.',
  fee:      'Our fees vary by matter type and complexity. We discuss fees transparently before commencing work. Contact us for a fee estimate.',
  contact:  'Email: info@gazelleassociate.com | Phone/WhatsApp: +234 703 424 0634',
}
function getReply(input: string): string {
  const l = input.toLowerCase()
  if (l.match(/practice|service|area|corporate|litigation|property|family|employment|ip|compliance/)) return CHAT_ANSWERS.practice
  if (l.match(/book|consult|appoint|schedule|meeting/)) return CHAT_ANSWERS.consult
  if (l.match(/locat|address|office|where|lagos/)) return CHAT_ANSWERS.location
  if (l.match(/hour|open|time|weekend/)) return CHAT_ANSWERS.hours
  if (l.match(/career|job|intern|recruit|apply|hire/)) return CHAT_ANSWERS.careers
  if (l.match(/fee|cost|price|charge|rate|money/)) return CHAT_ANSWERS.fee
  if (l.match(/contact|email|phone|whatsapp|reach|call/)) return CHAT_ANSWERS.contact
  return 'Thank you for your message. For detailed assistance, I\'d recommend speaking with one of our lawyers directly. Book a consultation or WhatsApp us: +234 703 424 0634.'
}

function ChatPanel({ onClose, onBook }: { onClose: () => void; onBook: () => void }) {
  const [messages, setMessages] = useState<ChatMsg[]>([{role:'bot',text:'Hello. I\'m the Gazelle Associate virtual assistant. How can I help you today?'}])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => { endRef.current?.scrollIntoView({behavior:'smooth'}) }, [messages])

  const send = useCallback((text?: string) => {
    const msg = (text || input).trim(); if (!msg) return
    setInput('')
    setMessages(m => [...m, {role:'user',text:msg}])
    setTyping(true)
    setTimeout(() => { setTyping(false); setMessages(m => [...m, {role:'bot',text:getReply(msg)}]) }, 900)
  }, [input])

  const QUICK = ['Practice areas','Book consultation','Office hours','Career opportunities','Contact details']

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-[150] w-[340px] sm:w-[380px] rounded-2xl shadow-2xl overflow-hidden flex flex-col anim-scale-in" style={{maxHeight:'70vh',background:'white'}}>
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{background:'#3E3D7C'}}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{background:'rgba(255,255,255,0.15)',color:'white'}}><Icon.bot /></div>
          <div>
            <p className="text-white font-semibold text-sm">Gazelle Assistant</p>
            <p className="text-indigo-200 text-xs">Typically replies instantly</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><Icon.x /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{minHeight:'220px',maxHeight:'320px'}}>
        {messages.map((m,i) => (
          <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`} style={{animation:`fadeUp 0.3s ease both`}}>
            <div className="rounded-2xl px-4 py-2.5 text-sm max-w-[82%] leading-relaxed"
              style={{background:m.role==='user'?'#3E3D7C':'#f5f5f8', color:m.role==='user'?'white':'#1a1a2e',
                borderRadius:m.role==='user'?'18px 18px 4px 18px':'18px 18px 18px 4px'}}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-2.5" style={{background:'#f5f5f8',borderRadius:'18px 18px 18px 4px'}}>
              <span className="flex gap-1 items-center h-4">
                {[0,150,300].map(d=>(
                  <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{background:'#9291a5',animationDelay:`${d}ms`}} />
                ))}
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0" style={{scrollbarWidth:'none'}}>
        {QUICK.map(q => (
          <button key={q} onClick={()=>send(q)}
            className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition-colors flex-shrink-0 hover:bg-indigo-50"
            style={{borderColor:'#3E3D7C',color:'#3E3D7C'}}>
            {q}
          </button>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-gray-100 flex gap-2 flex-shrink-0">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
          placeholder="Type a message..." className="flex-1 text-sm px-4 py-2.5 rounded-xl border outline-none"
          style={{borderColor:'#e5e5f0'}} />
        <button onClick={()=>send()} className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background:'#3E3D7C'}}>
          <Icon.send />
        </button>
      </div>
    </div>
  )
}

// ─── Floating Action Button ───────────────────────────────────────────────────
function FloatingButton({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const options = [
    { label:'Chat with AI Assistant',   Icon: Icon.bot,      action:()=>{setOpen(false);setChatOpen(true)} },
    { label:'WhatsApp a Lawyer',         Icon: Icon.whatsapp, action:()=>window.open('https://wa.me/2347034240634','_blank') },
    { label:'Book Consultation',         Icon: Icon.calendar, action:()=>{setOpen(false);onBook()} },
    { label:'Call Us',                   Icon: Icon.phone,    action:()=>window.open('tel:+2347034240634') },
    { label:'Email Us',                  Icon: Icon.mail,     action:()=>window.open('mailto:info@gazelleassociate.com') },
  ]

  return (
    <>
      {chatOpen && <ChatPanel onClose={()=>setChatOpen(false)} onBook={()=>{setChatOpen(false);onBook()}} />}
      <div className="fixed bottom-6 right-4 sm:right-6 z-[140] flex flex-col items-end gap-3">
        {open && (
          <div className="flex flex-col gap-2 items-end stagger">
            <p className="text-xs text-white font-medium px-3 py-1.5 rounded-full shadow-lg anim-fade-up" style={{background:'#3E3D7C'}}>How can we help you?</p>
            {options.map((opt,i) => (
              <button key={i} onClick={opt.action}
                className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl anim-fade-up"
                style={{background:'white',color:'#1a1a2e',animationDelay:`${i*0.05}s`}}>
                <span style={{color:'#3E3D7C'}}><opt.Icon /></span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        )}
        <div className="relative">
          {!open && (
            <span className="absolute inset-0 rounded-full fab-pulse" style={{pointerEvents:'none'}} />
          )}
          <button onClick={()=>setOpen(o=>!o)}
            className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            style={{background:'#3E3D7C', transform: open?'rotate(45deg)':'rotate(0deg)'}}
            aria-label="Open help menu">
            {open ? <Icon.x /> : <Icon.chat />}
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Cookie Consent ── bottom-right ──────────────────────────────────────────
function CookieConsent() {
  const [shown, setShown] = useState(true)
  const [prefs, setPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  if (!shown) return null
  return (
    <div className="fixed bottom-4 right-4 z-[130] w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 anim-slide-right" style={{animationDelay:'1.2s'}}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:'#eeeef8',color:'#3E3D7C'}}>
          <Icon.cookie />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{color:'#3E3D7C'}}>Cookie Notice</p>
      </div>
      {!prefs ? (
        <>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">We use cookies to improve your experience. By continuing, you agree to our use of cookies per our Privacy Policy.</p>
          <div className="flex gap-2">
            <button onClick={()=>setShown(false)} className="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105" style={{background:'#3E3D7C'}}>Accept All</button>
            <button onClick={()=>setPrefs(true)} className="flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-colors" style={{borderColor:'#3E3D7C',color:'#3E3D7C'}}>Preferences</button>
            <button onClick={()=>setShown(false)} className="py-2 px-3 rounded-xl text-xs font-semibold border border-gray-200 text-gray-400">Reject</button>
          </div>
        </>
      ) : (
        <>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:'#3E3D7C'}}>Preferences</p>
          {[
            {name:'Essential', desc:'Required for site function', on:true, fixed:true},
            {name:'Analytics', desc:'Help us understand visitors', on:analytics, toggle:()=>setAnalytics(a=>!a), fixed:false},
            {name:'Marketing', desc:'Targeted advertising', on:marketing, toggle:()=>setMarketing(m=>!m), fixed:false},
          ].map(c => (
            <div key={c.name} className="flex items-center justify-between mb-2.5">
              <div><p className="text-xs font-semibold text-gray-700">{c.name}</p><p className="text-xs text-gray-400">{c.desc}</p></div>
              <button onClick={c.fixed?undefined:c.toggle} disabled={c.fixed}
                className="w-10 h-5.5 rounded-full transition-colors relative flex-shrink-0 ml-3"
                style={{background:c.on?'#3E3D7C':'#e5e5f0', height:'22px', cursor:c.fixed?'not-allowed':'pointer'}}>
                <span className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-all duration-200"
                  style={{left:c.on?'calc(100% - 20px)':'2px', width:'18px', height:'18px'}} />
              </button>
            </div>
          ))}
          <button onClick={()=>setShown(false)} className="w-full mt-3 py-2 rounded-xl text-xs font-semibold text-white" style={{background:'#3E3D7C'}}>Save Preferences</button>
        </>
      )}
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ currentPage, navigate, onBook }: {currentPage:string; navigate:(p:string)=>void; onBook:()=>void}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, {passive:true})
    return () => window.removeEventListener('scroll', h)
  }, [])

  const navItems = [{label:'Home',page:'home'},{label:'About',page:'about'},{label:'Practice Areas',page:'practice-areas'},{label:'Our People',page:'our-people'},{label:'Insights',page:'insights'},{label:'Careers',page:'careers'},{label:'Contact',page:'contact'}]
  const isActive = (p:string) => currentPage===p||currentPage.startsWith(p+'/')

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-400"
        style={{background:scrolled?'rgba(255,255,255,0.98)':'rgba(255,255,255,0.96)',
          boxShadow:scrolled?'0 2px 24px rgba(62,61,124,0.1)':'none',
          backdropFilter:'blur(16px)', height:scrolled?'64px':'72px'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <button onClick={()=>navigate('home')} className="flex items-center gap-3 flex-shrink-0 transition-transform hover:scale-105" aria-label="Gazelle Associate Home">
            <img src={logoImg} alt="Gazelle Associate logo" className="w-auto object-contain transition-all duration-300"
              style={{height:scrolled?'36px':'44px'}} />
            <div className="hidden sm:block">
              <p className="font-serif text-base leading-none" style={{color:'#3E3D7C'}}>Gazelle Associate</p>
              <p className="text-[9px] tracking-widest uppercase text-gray-400 mt-0.5">Legal Practice</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-5" aria-label="Main navigation">
            {navItems.map(({label,page}) => (
              <button key={page} onClick={()=>navigate(page)}
                className="text-sm font-medium transition-all relative py-1 hover:opacity-70"
                style={{color:isActive(page)?'#3E3D7C':'#1a1a2e'}}>
                {label}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
                  style={{background:'#3E3D7C', transform:isActive(page)?'scaleX(1)':'scaleX(0)', transformOrigin:'left'}} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={onBook} className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg" style={{background:'#3E3D7C'}}>
              Book Consultation
            </button>
            <button onClick={()=>setMobileOpen(o=>!o)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors" style={{color:'#3E3D7C'}} aria-label="Open menu">
              {mobileOpen ? <Icon.x /> : <Icon.menu />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[99] lg:hidden" style={{background:'rgba(26,26,46,0.6)'}} onClick={()=>setMobileOpen(false)}>
          <nav className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col anim-slide-right" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <p className="font-serif text-base" style={{color:'#3E3D7C'}}>Menu</p>
              <button onClick={()=>setMobileOpen(false)} className="text-gray-400"><Icon.x /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {navItems.map(({label,page}) => (
                <button key={page} onClick={()=>{navigate(page);setMobileOpen(false)}}
                  className="w-full text-left px-6 py-3.5 text-sm font-medium border-l-2 transition-all"
                  style={{borderColor:isActive(page)?'#3E3D7C':'transparent', color:isActive(page)?'#3E3D7C':'#1a1a2e', background:isActive(page)?'#eeeef8':'transparent'}}>
                  {label}
                </button>
              ))}
            </div>
            <div className="px-6 py-5 border-t border-gray-100">
              <button onClick={()=>{onBook();setMobileOpen(false)}} className="w-full py-3 rounded-xl text-sm font-semibold text-white" style={{background:'#3E3D7C'}}>Book Consultation</button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ navigate, onBook }: {navigate:(p:string)=>void; onBook:()=>void}) {
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)
  return (
    <footer style={{background:'#1a1a2e',color:'white'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={logoImg} alt="Gazelle Associate" className="h-10 w-auto" style={{filter:'brightness(0) invert(1) opacity(0.9)'}} />
              <div>
                <p className="font-serif text-base">Gazelle Associate</p>
                <p className="text-[9px] tracking-widest uppercase text-gray-500">Legal Practice</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">A modern Nigerian law firm providing trusted legal counsel and representation to individuals, businesses, investors, and institutions.</p>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{color:'#6564b0'}}>Law. Strategy. Representation. Results.</p>
            <div className="flex items-center gap-4 mt-5">
              {[
                {I: Icon.linkedin,   href:'#'},
                {I: Icon.twitter,    href:'#'},
                {I: Icon.instagram,  href:'#'},
              ].map(({I,href},i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{background:'rgba(255,255,255,0.08)',color:'#9291a5'}}>
                  <I />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Practice Areas</p>
            <div className="space-y-2">
              {PRACTICE_AREAS.slice(0,5).map(pa => (
                <button key={pa.slug} onClick={()=>navigate(`practice-area/${pa.slug}`)} className="block text-sm text-gray-400 hover:text-white transition-colors text-left">{pa.title}</button>
              ))}
              <button onClick={()=>navigate('practice-areas')} className="block text-sm transition-colors" style={{color:'#6564b0'}}>View all →</button>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Company</p>
            <div className="space-y-2 mb-6">
              {[{label:'About Us',page:'about'},{label:'Our People',page:'our-people'},{label:'Insights',page:'insights'},{label:'Careers',page:'careers'},{label:'Contact',page:'contact'}].map(({label,page})=>(
                <button key={page} onClick={()=>navigate(page)} className="block text-sm text-gray-400 hover:text-white transition-colors">{label}</button>
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Legal</p>
            <div className="space-y-2">
              {['Privacy Policy','Cookie Policy','Legal Notice','Accessibility'].map(l=>(
                <button key={l} className="block text-sm text-gray-400 hover:text-white transition-colors">{l}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Contact</p>
            <address className="not-italic space-y-3 mb-6">
              <a href="tel:+2347034240634" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                <span className="text-gray-600 group-hover:text-indigo-400 transition-colors"><Icon.phone /></span>+234 703 424 0634
              </a>
              <a href="mailto:info@gazelleassociate.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                <span className="text-gray-600 group-hover:text-indigo-400 transition-colors"><Icon.mail /></span>info@gazelleassociate.com
              </a>
              <a href="https://wa.me/2347034240634" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors" style={{color:'#4CAF50'}}>
                <Icon.whatsapp />WhatsApp
              </a>
            </address>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Newsletter</p>
            {!subbed ? (
              <div className="flex gap-2">
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email"
                  className="flex-1 bg-white/8 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-white/30 transition-colors" />
                <button onClick={()=>email&&setSubbed(true)} className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110" style={{background:'#3E3D7C'}}>
                  <Icon.arrowRight />
                </button>
              </div>
            ) : (
              <p className="text-sm flex items-center gap-2" style={{color:'#6564b0'}}><Icon.checkCircle /> Subscribed.</p>
            )}
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2026 Gazelle Associate. A legal practice of Gazelle International Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Reveal wrappers ──────────────────────────────────────────────────────────
function Reveal({ children, className='', dir='up' }: {children:React.ReactNode; className?:string; dir?:'up'|'left'|'right'}) {
  const cls = dir==='left'?'reveal-left':dir==='right'?'reveal-right':'reveal'
  const ref = useReveal(cls)
  return <div ref={ref} className={`${cls} ${className}`}>{children}</div>
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ items }: {items:{q:string;a:string}[]}) {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <div className="space-y-3">
      {items.map((item,i) => (
        <div key={i} className="border rounded-xl overflow-hidden transition-all duration-300"
          style={{borderColor:open===i?'#3E3D7C':'#e5e5f0', boxShadow:open===i?'0 4px 20px rgba(62,61,124,0.1)':'none'}}>
          <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-center justify-between px-5 py-4 text-left group">
            <h3 className="font-semibold text-sm pr-4 group-hover:text-indigo-700 transition-colors" style={{color:'#1a1a2e'}}>{item.q}</h3>
            <span className="flex-shrink-0 transition-transform duration-300 text-gray-400" style={{transform:open===i?'rotate(180deg)':'none',color:open===i?'#3E3D7C':'#9291a5'}}>
              <Icon.chevronDown />
            </span>
          </button>
          {open===i && (
            <div className="px-5 pb-4 anim-fade-up">
              <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ navigate, onBook }: {navigate:(p:string)=>void; onBook:()=>void}) {
  const [activeIndustry, setActiveIndustry] = useState(0)
  const [countersVisible, setCountersVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [parallax, setParallax] = useState(0)

  useEffect(() => {
    const h = () => setParallax(window.scrollY * 0.3)
    window.addEventListener('scroll', h, {passive:true})
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const el = statsRef.current; if(!el) return
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setCountersVisible(true);obs.disconnect()}},{threshold:0.3})
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const industries = [
    {name:'Financial Services',Icon:Icon.bank,      desc:'Banking, fintech, insurance, and capital markets legal support.'},
    {name:'Technology & Startups',Icon:Icon.code,   desc:'Structuring, IP protection, regulatory compliance for tech businesses.'},
    {name:'Real Estate',        Icon:Icon.building2, desc:'Property transactions, development agreements, and construction disputes.'},
    {name:'Energy & Resources', Icon:Icon.zap,       desc:'Oil & gas, renewable energy, and extractive industries legal advisory.'},
    {name:'Healthcare',         Icon:Icon.heartPulse,desc:'Healthcare regulation, licensing, and institutional agreements.'},
    {name:'Media & Entertainment',Icon:Icon.film,   desc:'IP, contracts, and commercial structuring for the creative industry.'},
    {name:'Manufacturing',      Icon:Icon.factory,   desc:'Commercial contracts, trade law, and supply chain disputes.'},
    {name:'NGOs & Civil Society',Icon:Icon.handshake,desc:'Registration, compliance, governance for non-profit organisations.'},
  ]

  const testimonials = [
    {name:'Chukwuemeka Eze',   role:'CEO, TechBridge Nigeria',      quote:'Gazelle Associate handled our Series A structuring with impressive commercial awareness. They understood not just the legal issues but the business implications at every step.'},
    {name:'Amina Suleiman',    role:'MD, Suleiman Property Group',  quote:'The property team helped us through a complex commercial acquisition with real expertise. Their title investigation was thorough, and the process was seamless.'},
    {name:'Dr. Ngozi Adeleke', role:'Founder, Adeleke Family Office',quote:'Professional, discreet, and genuinely helpful. They handled our estate planning matters with the sensitivity and expertise the situation required.'},
    {name:'Babajide Olatunji', role:'COO, Meridian Trade Ltd',      quote:'From contract review to employment matters, Gazelle Associate has been our go-to legal partner. They respond quickly and give practical advice.'},
  ]

  const homeFaqs = [
    {q:'What types of clients does Gazelle Associate serve?',       a:'We serve individuals, families, small and medium businesses, large corporations, multinationals, financial institutions, NGOs, and government-related entities. Our practice spans diverse legal needs across personal, commercial, and institutional matters.'},
    {q:'How do I book a consultation?',                             a:'You can book directly on our website by selecting your practice area, preferred meeting type (virtual, office, or phone), choosing a lawyer, and selecting a time. We confirm all bookings within 24 hours.'},
    {q:'Does Gazelle Associate handle matters outside Lagos?',      a:'Yes. While our office is based in Lagos, we advise clients across Nigeria and, through appropriate professional networks, provide legal support with an international dimension where required.'},
    {q:'Are initial consultations confidential?',                   a:'Yes. All consultations and communications with Gazelle Associate are protected by professional confidentiality. Submitting an enquiry through our website does not automatically create a lawyer-client relationship.'},
    {q:'Can I get legal advice without visiting the office?',       a:'Yes. We offer virtual consultations via video call and telephone consultations. Many of our clients conduct their entire legal relationship with us remotely.'},
    {q:'How does billing work?',                                    a:'Our fee structures depend on the nature and complexity of your matter. We discuss fees transparently at the outset and agree on terms before commencing any substantive work.'},
  ]

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{height:'100vh',minHeight:'640px'}}>
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="Nigerian legal professionals in a corporate boardroom"
            className="w-full h-full object-cover"
            style={{transform:`translateY(${parallax}px)`,transition:'transform 0.1s linear'}} loading="eager" />
          <div className="absolute inset-0" style={{background:'linear-gradient(135deg,rgba(26,26,46,0.88) 0%,rgba(62,61,124,0.6) 55%,rgba(26,26,46,0.55) 100%)'}} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-300 mb-6 anim-fade-up" style={{animationDelay:'0.2s'}}>Gazelle Associate — Lagos, Nigeria</p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-none mb-8 max-w-3xl anim-fade-up" style={{animationDelay:'0.4s'}}>
            Law.<br />Strategy.<br />Representation.<br />Results.
          </h1>
          <p className="text-gray-200 text-lg sm:text-xl max-w-xl leading-relaxed mb-10 anim-fade-up" style={{animationDelay:'0.6s'}}>
            Gazelle Associate is a modern Nigerian law firm providing trusted legal counsel and representation to individuals, businesses, investors, and institutions.
          </p>
          <div className="flex flex-wrap gap-4 anim-fade-up" style={{animationDelay:'0.8s'}}>
            <button onClick={onBook} className="px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 hover:shadow-2xl" style={{background:'#3E3D7C'}}>Book a Consultation</button>
            <button onClick={()=>navigate('practice-areas')} className="px-8 py-4 rounded-xl font-semibold text-sm border-2 text-white border-white/30 hover:bg-white/10 transition-all">Explore Practice Areas</button>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fade-in" style={{animationDelay:'1.4s'}}>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER ── */}
      <section className="py-10 border-b border-gray-100" style={{background:'#f5f5f8'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm leading-relaxed text-gray-600"><strong className="text-gray-900">Gazelle Associate</strong> is a full-service Nigerian law firm providing legal services in corporate law, litigation, finance, property, family law, employment, intellectual property, and regulatory compliance. We serve individuals, businesses, investors, and institutions across Nigeria with professional legal counsel, strategic advice, and courtroom representation.</p>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal dir="left">
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{color:'#3E3D7C'}}>Who We Are</p>
              <h2 className="font-serif text-4xl sm:text-5xl mb-6 leading-tight" style={{color:'#1a1a2e'}}>Legal Counsel With a Broader Perspective</h2>
              <p className="text-gray-600 leading-relaxed mb-4">At Gazelle Associate, we understand that legal challenges rarely exist in isolation.</p>
              <div className="space-y-2 mb-8">
                {['A corporate transaction may affect your business strategy.','A property transaction may affect your financial future.','A dispute may affect your reputation and operations.','A regulatory decision may affect your ability to grow.'].map((s,i)=>(
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{background:'#3E3D7C'}} />
                    <p className="text-gray-600 text-sm">{s}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-8">That is why we approach every matter with both legal precision and a clear understanding of the bigger picture.</p>
              <button onClick={()=>navigate('about')} className="inline-flex items-center gap-2 font-semibold text-sm transition-all hover:gap-3" style={{color:'#3E3D7C'}}>
                Learn About Our Firm <Icon.arrowRight />
              </button>
            </Reveal>
            <Reveal dir="right" className="reveal-delay-2">
              <div className="relative rounded-2xl overflow-hidden img-zoom" style={{height:'500px'}}>
                <img src={IMG.consult} alt="Nigerian lawyers in professional legal consultation" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6" style={{background:'linear-gradient(to top,rgba(26,26,46,0.9),transparent)'}}>
                  <div ref={statsRef} className="grid grid-cols-3 gap-4 text-center text-white">
                    {[{n:'9+',label:'Practice Areas'},{n:'100+',label:'Clients Served'},{n:'15+',label:'Years Experience'}].map((s,i)=>(
                      <div key={i} style={{animation:countersVisible?`countUp 0.7s cubic-bezier(.22,1,.36,1) ${i*0.15}s both`:'none'}}>
                        <p className="font-serif text-4xl">{s.n}</p>
                        <p className="text-xs text-white/60 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="py-24 lg:py-32" style={{background:'#f5f5f8'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#3E3D7C'}}>What We Do</p>
            <h2 className="font-serif text-4xl sm:text-5xl mb-4" style={{color:'#1a1a2e'}}>Our Areas of Practice</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">Comprehensive legal services across diverse areas of Nigerian law.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRACTICE_AREAS.map((pa,i) => (
              <Reveal key={pa.slug} className={`reveal-delay-${Math.min(i%3+1,5)}`}>
                <div className="practice-card group bg-white rounded-2xl p-7 border border-gray-100 cursor-pointer h-full flex flex-col"
                  onClick={()=>navigate(`practice-area/${pa.slug}`)}>
                  <IconBadge Icon={pa.Icon} size="md" />
                  <h3 className="font-serif text-lg mt-5 mb-2 flex-1" style={{color:'#1a1a2e'}}>{pa.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{pa.short}</p>
                  <div className="flex gap-3 mt-auto">
                    <button onClick={e=>{e.stopPropagation();navigate(`practice-area/${pa.slug}`)}}
                      className="text-xs font-semibold transition-colors hover:underline" style={{color:'#3E3D7C'}}>Learn More →</button>
                    <button onClick={e=>{e.stopPropagation();onBook()}}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all hover:scale-105" style={{background:'#3E3D7C'}}>Book</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <button onClick={()=>navigate('practice-areas')} className="px-8 py-4 rounded-xl font-semibold text-sm border-2 transition-all hover:scale-105" style={{borderColor:'#3E3D7C',color:'#3E3D7C'}}>View All Practice Areas</button>
          </Reveal>
        </div>
      </section>

      {/* ── WHY GAZELLE ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#3E3D7C'}}>Why Choose Us</p>
            <h2 className="font-serif text-4xl sm:text-5xl" style={{color:'#1a1a2e'}}>Why Clients Choose Gazelle Associate</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {Icon:Icon.award,     title:'Legal Excellence',     desc:'We approach every matter with diligence, technical knowledge, and professional discipline.'},
              {Icon:Icon.compass,   title:'Strategic Perspective',desc:'We consider not only the immediate legal issue but also its wider implications for our clients.'},
              {Icon:Icon.clientfocus,title:'Client-Centred Service',desc:'We listen carefully, communicate clearly, and tailor our approach to each client\'s circumstances.'},
              {Icon:Icon.commercial,title:'Commercial Awareness',  desc:'We understand the realities of business and the importance of practical legal solutions.'},
              {Icon:Icon.integrity, title:'Integrity & Confidentiality',desc:'Our clients trust us with sensitive matters, and we take that responsibility seriously.'},
              {Icon:Icon.global,    title:'Nigerian Excellence',  desc:'Proudly Nigerian, globally minded. We serve clients with deep local knowledge and international perspective.'},
            ].map((card,i) => (
              <Reveal key={i} className={`reveal-delay-${Math.min(i%3+1,5)}`}>
                <div className="group card-hover p-7 rounded-2xl border border-gray-100 h-full cursor-default" style={{background:'white'}}>
                  <IconBadge Icon={card.Icon} />
                  <h3 className="font-semibold mt-5 mb-2" style={{color:'#1a1a2e'}}>{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 lg:py-32" style={{background:'#3E3D7C'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-indigo-200">How We Work</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">Our Process</h2>
            <p className="text-indigo-200 text-sm max-w-xl mx-auto">A structured, transparent approach designed to give you clarity and confidence at every stage.</p>
          </Reveal>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
            {[
              {step:'01',title:'Understand',desc:'We begin by listening carefully to your objectives, circumstances, and the legal challenge you face.'},
              {step:'02',title:'Analyse',   desc:'We conduct a thorough legal and commercial analysis of your matter, identifying risks, opportunities, and options.'},
              {step:'03',title:'Advise',    desc:'We provide clear, practical advice in plain language — setting out your options and our professional recommendation.'},
              {step:'04',title:'Act',       desc:'Where representation or implementation is required, we act diligently, professionally, and transparently on your behalf.'},
            ].map((item,i) => (
              <Reveal key={i} className={`reveal-delay-${i+1}`}>
                <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 ${i%2===1?'md:flex-row-reverse':''}`}>
                  <div className={`md:w-1/2 ${i%2===1?'md:text-right':''}`}>
                    <div className={`inline-flex items-center gap-3 mb-3 ${i%2===1?'md:flex-row-reverse':''}`}>
                      <div className="w-10 h-10 rounded-full border-2 border-indigo-300/50 flex items-center justify-center text-xs font-bold text-white" style={{background:'rgba(255,255,255,0.1)'}}>
                        {item.step}
                      </div>
                      <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                    </div>
                    <p className="text-indigo-200 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="hidden md:flex md:w-1/2 justify-center">
                    <div className="w-4 h-4 rounded-full border-4 border-white/30 bg-indigo-400 z-10 anim-float" style={{animationDelay:`${i*0.4}s`}} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-6">
            <button onClick={onBook} className="px-8 py-4 rounded-xl font-semibold text-sm border-2 border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105">Begin Your Consultation</button>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-24 lg:py-32" style={{background:'#f5f5f8'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#3E3D7C'}}>Sectors</p>
            <h2 className="font-serif text-4xl sm:text-5xl mb-4" style={{color:'#1a1a2e'}}>Industries We Serve</h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {industries.map((ind,i) => (
              <button key={i} onClick={()=>setActiveIndustry(i)}
                className="text-left p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105"
                style={{borderColor:activeIndustry===i?'#3E3D7C':'#e5e5f0', background:activeIndustry===i?'#3E3D7C':'white', color:activeIndustry===i?'white':'#1a1a2e'}}>
                <div className="mb-3" style={{color:activeIndustry===i?'white':'#3E3D7C'}}><ind.Icon /></div>
                <span className="font-semibold text-xs leading-tight block">{ind.name}</span>
              </button>
            ))}
          </div>
          {industries[activeIndustry] && (
            <div className="mt-4 p-6 rounded-2xl bg-white border border-gray-100 anim-fade-in" key={activeIndustry}>
              <div className="flex items-center gap-3 mb-2">
                {(() => { const I = industries[activeIndustry].Icon; return <div style={{color:'#3E3D7C'}}><I /></div> })()}
                <h3 className="font-serif text-lg" style={{color:'#1a1a2e'}}>{industries[activeIndustry].name}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{industries[activeIndustry].desc}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#3E3D7C'}}>Client Testimonials</p>
            <h2 className="font-serif text-4xl sm:text-5xl" style={{color:'#1a1a2e'}}>What Our Clients Say</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {testimonials.map((t,i) => (
              <Reveal key={i} className={`reveal-delay-${i%2+1}`}>
                <div className="card-hover p-7 rounded-2xl border border-gray-100 h-full flex flex-col" style={{background:'white'}}>
                  <div className="mb-4" style={{color:'#3E3D7C'}}><Icon.sparkle /></div>
                  <p className="text-gray-700 text-sm leading-relaxed flex-1 italic mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{background:'#3E3D7C'}}>{t.name.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-sm" style={{color:'#1a1a2e'}}>{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ── */}
      <section className="py-24 lg:py-32" style={{background:'#f5f5f8'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#3E3D7C'}}>Insights</p>
              <h2 className="font-serif text-4xl sm:text-5xl" style={{color:'#1a1a2e'}}>Perspectives That Matter</h2>
            </div>
            <button onClick={()=>navigate('insights')} className="flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3" style={{color:'#3E3D7C'}}>Read All Insights <Icon.arrowRight /></button>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSIGHTS.slice(0,3).map((a,i) => (
              <Reveal key={i} className={`reveal-delay-${i+1}`}>
                <article className="insight-card bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group card-hover" onClick={()=>navigate(`insight/${a.slug}`)}>
                  <div className="overflow-hidden h-48">
                    <img src={a.img} alt={a.title} className="insight-img w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{background:'#eeeef8',color:'#3E3D7C'}}>{a.category}</span>
                      <span className="text-xs text-gray-400">{a.readTime}</span>
                    </div>
                    <h3 className="font-serif text-base mb-2 leading-snug group-hover:text-indigo-700 transition-colors" style={{color:'#1a1a2e'}}>{a.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{a.excerpt}</p>
                    <p className="text-xs text-gray-400 mt-3">{a.date}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM PREVIEW ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#3E3D7C'}}>Our Team</p>
              <h2 className="font-serif text-4xl sm:text-5xl" style={{color:'#1a1a2e'}}>Meet Our Lawyers</h2>
            </div>
            <button onClick={()=>navigate('our-people')} className="flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3" style={{color:'#3E3D7C'}}>Meet All Our People <Icon.arrowRight /></button>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.slice(0,3).map((t,i) => (
              <Reveal key={i} className={`reveal-delay-${i+1}`}>
                <div className="group rounded-2xl overflow-hidden border border-gray-100 card-hover cursor-pointer bg-white" onClick={()=>navigate('our-people')}>
                  <div className="h-72 img-zoom">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl mb-0.5" style={{color:'#1a1a2e'}}>{t.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:'#9291a5'}}>{t.title}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.expertise.slice(0,2).map(e=>(
                        <span key={e} className="text-xs px-2 py-0.5 rounded-md" style={{background:'#eeeef8',color:'#3E3D7C'}}>{e}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 lg:py-32" style={{background:'#f5f5f8'}}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#3E3D7C'}}>FAQ</p>
            <h2 className="font-serif text-4xl sm:text-5xl mb-4" style={{color:'#1a1a2e'}}>Frequently Asked Questions</h2>
          </Reveal>
          <Reveal><FAQ items={homeFaqs} /></Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28" style={{background:'#1a1a2e'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-indigo-300">Get In Touch</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">Let's Talk About What Matters to You</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">Whether you are building a business, navigating a dispute, protecting your property, structuring an investment, or dealing with a personal legal matter, our team is ready to listen.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={onBook} className="px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 hover:shadow-2xl" style={{background:'#3E3D7C'}}>Book a Consultation</button>
              <button onClick={()=>navigate('contact')} className="px-8 py-4 rounded-xl font-semibold text-sm border-2 border-white/20 text-white hover:bg-white/10 transition-all">Contact Us</button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ navigate, onBook }: {navigate:(p:string)=>void; onBook:()=>void}) {
  return (
    <main className="pt-20 page-enter">
      <section className="relative py-28 overflow-hidden" style={{background:'#1a1a2e'}}>
        <div className="absolute inset-0 opacity-25"><img src={IMG.team} alt="" className="w-full h-full object-cover" aria-hidden /></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center anim-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-300 mb-4">About Us</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white mb-6 leading-tight">A Modern Law Firm Built Around the Needs of Our Clients</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">Gazelle Associate is a full-service Nigerian law firm committed to providing professional, strategic, and client-focused legal services.</p>
        </div>
      </section>
      <section className="py-8 border-b border-gray-100" style={{background:'#f5f5f8'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600 leading-relaxed"><strong>Gazelle Associate</strong> is a full-service Nigerian law firm established to meet the legal needs of a changing economy. We combine legal excellence, strategic thinking, and commercial awareness to serve individuals, businesses, investors, and institutions across Nigeria with trusted legal counsel and effective representation.</p>
        </div>
      </section>
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal dir="left">
              <div className="rounded-2xl overflow-hidden img-zoom" style={{height:'480px'}}>
                <img src={IMG.boardroom} alt="Modern corporate boardroom" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal dir="right" className="reveal-delay-2">
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{color:'#3E3D7C'}}>Our Story</p>
              <h2 className="font-serif text-4xl mb-6" style={{color:'#1a1a2e'}}>Built for a Changing Legal and Business Environment</h2>
              <div className="space-y-2 mb-6">
                {['Businesses are becoming more complex.','Investments cross borders.','Technology is reshaping industries.','Regulatory environments are becoming more demanding.'].map(s=>(
                  <div key={s} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{background:'#3E3D7C'}} /><p className="text-sm text-gray-600">{s}</p></div>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">Gazelle Associate was established with the vision of building a modern law firm that combines strong legal practice with strategic thinking, commercial awareness, and a genuine commitment to client service.</p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="py-24 lg:py-32" style={{background:'#f5f5f8'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#3E3D7C'}}>Our Approach</p>
            <h2 className="font-serif text-4xl mb-3" style={{color:'#1a1a2e'}}>We Look Beyond the Immediate Problem</h2>
            <p className="font-serif text-xl italic" style={{color:'#6564b0'}}>Understand. Analyse. Advise. Act.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {[{step:'Understand',desc:'We begin by understanding our client\'s objectives and circumstances, listening carefully to what matters most.'},{step:'Analyse',desc:'We analyse the legal and commercial issues involved with rigour and precision, exploring all relevant dimensions.'},{step:'Advise',desc:'We provide clear, practical advice in plain language — not just legal opinions, but guidance you can act on.'},{step:'Act',desc:'Where representation or implementation is required, we act diligently and professionally on your behalf.'}].map((s,i)=>(
              <Reveal key={i} className={`reveal-delay-${i+1}`}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 card-hover">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{background:'#3E3D7C'}}>{i+1}</div>
                    <h3 className="font-serif text-xl" style={{color:'#1a1a2e'}}>{s.step}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#3E3D7C'}}>Our Values</p>
            <h2 className="font-serif text-4xl" style={{color:'#1a1a2e'}}>What We Stand For</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[{Icon:Icon.handshake,title:'Integrity',desc:'We uphold the highest standards of honesty and professional conduct.'},{Icon:Icon.star,title:'Excellence',desc:'We pursue quality in every matter we undertake.'},{Icon:Icon.lock,title:'Confidentiality',desc:'We respect the trust clients place in us and protect sensitive information.'},{Icon:Icon.checkCircle,title:'Accountability',desc:'We take responsibility for our work and professional obligations.'},{Icon:Icon.puzzle,title:'Strategic Thinking',desc:'We consider the bigger picture — not just the immediate legal issue.'},{Icon:Icon.clientfocus,title:'Client Commitment',desc:'Our clients remain at the centre of our practice.'}].map((v,i)=>(
              <Reveal key={i} className={`reveal-delay-${i%3+1}`}>
                <div className="group card-hover p-7 rounded-2xl border border-gray-100" style={{background:'white'}}>
                  <IconBadge Icon={v.Icon} />
                  <h3 className="font-semibold mt-5 mb-2" style={{color:'#1a1a2e'}}>{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20" style={{background:'#3E3D7C'}}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="font-serif text-4xl text-white mb-4">Ready to Work With Us?</h2>
            <p className="text-indigo-200 mb-8">Book a consultation to discuss your legal matter with our team.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={onBook} className="px-8 py-4 rounded-xl font-semibold text-sm bg-white transition-all hover:scale-105" style={{color:'#3E3D7C'}}>Book a Consultation</button>
              <button onClick={()=>navigate('our-people')} className="px-8 py-4 rounded-xl font-semibold text-sm border-2 border-white/30 text-white hover:bg-white/10 transition-all">Meet Our Lawyers</button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

// ─── PRACTICE AREAS PAGE ──────────────────────────────────────────────────────
function PracticeAreasPage({ navigate, onBook }: {navigate:(p:string)=>void; onBook:()=>void}) {
  return (
    <main className="pt-20 page-enter">
      <section className="relative py-28 overflow-hidden" style={{background:'#1a1a2e'}}>
        <div className="absolute inset-0 opacity-20"><img src={IMG.office} alt="" className="w-full h-full object-cover" aria-hidden /></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center anim-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-300 mb-4">Practice Areas</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white mb-6">Our Practice Areas</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Comprehensive legal counsel for individuals, businesses, investors, and institutions.</p>
        </div>
      </section>
      <section className="py-8 border-b border-gray-100" style={{background:'#f5f5f8'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600 leading-relaxed">Gazelle Associate provides expert legal services across nine core practice areas. Our multidisciplinary approach means clients can access the full breadth of legal expertise they need from a single firm.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICE_AREAS.map((pa,i) => (
              <Reveal key={pa.slug} className={`reveal-delay-${i%3+1}`}>
                <div className="group practice-card bg-white rounded-2xl p-7 border border-gray-100 cursor-pointer h-full flex flex-col" onClick={()=>navigate(`practice-area/${pa.slug}`)}>
                  <IconBadge Icon={pa.Icon} size="lg" />
                  <h2 className="font-serif text-xl mt-5 mb-3" style={{color:'#1a1a2e'}}>{pa.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{pa.short}</p>
                  <ul className="space-y-1.5 mb-6">
                    {pa.services.slice(0,4).map(s=>(
                      <li key={s} className="flex items-start gap-2 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{background:'#3E3D7C'}} />{s}
                      </li>
                    ))}
                    {pa.services.length>4 && <li className="text-xs" style={{color:'#9291a5'}}>+{pa.services.length-4} more services</li>}
                  </ul>
                  <div className="flex gap-3 mt-auto">
                    <button onClick={e=>{e.stopPropagation();navigate(`practice-area/${pa.slug}`)}} className="flex-1 text-xs font-semibold py-2.5 rounded-xl border-2 transition-colors" style={{borderColor:'#3E3D7C',color:'#3E3D7C'}}>Learn More</button>
                    <button onClick={e=>{e.stopPropagation();onBook()}} className="flex-1 text-xs font-semibold py-2.5 rounded-xl text-white transition-all hover:scale-105" style={{background:'#3E3D7C'}}>Book</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16" style={{background:'#3E3D7C'}}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl text-white mb-4">Not Sure Which Practice Area Applies?</h2>
            <p className="text-indigo-200 mb-6 text-sm">Book an initial consultation and we will help you identify the right legal approach for your matter.</p>
            <button onClick={onBook} className="px-8 py-4 rounded-xl font-semibold text-sm bg-white transition-all hover:scale-105" style={{color:'#3E3D7C'}}>Book a Consultation</button>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

// ─── PRACTICE AREA DETAIL ─────────────────────────────────────────────────────
function PracticeAreaDetailPage({ slug, navigate, onBook }: {slug:string; navigate:(p:string)=>void; onBook:()=>void}) {
  const pa = PRACTICE_AREAS.find(p=>p.slug===slug) || PRACTICE_AREAS[0]
  const related = PRACTICE_AREAS.filter(p=>p.slug!==pa.slug).slice(0,3)
  return (
    <main className="pt-20 page-enter">
      <section className="py-24" style={{background:'#1a1a2e'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 anim-fade-up">
          <button onClick={()=>navigate('practice-areas')} className="flex items-center gap-2 text-sm text-indigo-300 mb-6 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Practice Areas
          </button>
          <div className="flex items-center gap-5 mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{background:'rgba(255,255,255,0.1)',color:'white'}}><pa.Icon /></div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-300 mb-1">Practice Area</p>
              <h1 className="font-serif text-4xl sm:text-5xl text-white">{pa.title}</h1>
            </div>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">{pa.short}</p>
        </div>
      </section>
      <section className="py-8 border-b border-gray-100" style={{background:'#f5f5f8'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600 leading-relaxed">Gazelle Associate's {pa.title} practice provides expert legal advice and representation. Our lawyers combine deep technical knowledge with practical experience to deliver effective legal solutions tailored to each client's circumstances.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="font-serif text-3xl mb-6" style={{color:'#1a1a2e'}}>Our Services</h2>
                <div className="grid sm:grid-cols-2 gap-3 mb-12">
                  {pa.services.map(s=>(
                    <div key={s} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all" style={{background:'white'}}>
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{background:'#3E3D7C'}} />
                      <span className="text-sm text-gray-700">{s}</span>
                    </div>
                  ))}
                </div>
                <h2 className="font-serif text-3xl mb-6" style={{color:'#1a1a2e'}}>Frequently Asked Questions</h2>
                <FAQ items={pa.faq} />
              </Reveal>
            </div>
            <div>
              <Reveal className="reveal-delay-2">
                <div className="rounded-2xl p-6 sticky top-24" style={{background:'#eeeef8'}}>
                  <h3 className="font-serif text-lg mb-3" style={{color:'#1a1a2e'}}>Speak With a Lawyer</h3>
                  <p className="text-sm text-gray-600 mb-5">Our team is ready to assist with your matter.</p>
                  <button onClick={onBook} className="w-full py-3 rounded-xl font-semibold text-sm text-white mb-3 transition-all hover:scale-105" style={{background:'#3E3D7C'}}>Book a Consultation</button>
                  <a href="https://wa.me/2347034240634" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm border-2 transition-colors" style={{borderColor:'#3E3D7C',color:'#3E3D7C'}}>
                    <Icon.whatsapp /> WhatsApp a Lawyer
                  </a>
                  <p className="text-xs text-gray-500 leading-relaxed mt-5 pt-5 border-t border-indigo-100">Submitting an enquiry does not automatically create a lawyer-client relationship.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14" style={{background:'#f5f5f8'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl mb-6" style={{color:'#1a1a2e'}}>Related Practice Areas</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map(r=>(
              <button key={r.slug} onClick={()=>navigate(`practice-area/${r.slug}`)} className="text-left p-5 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 card-hover group">
                <div className="mb-3" style={{color:'#3E3D7C'}}><r.Icon /></div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-indigo-700 transition-colors" style={{color:'#1a1a2e'}}>{r.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{r.short}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

// ─── OUR PEOPLE PAGE ──────────────────────────────────────────────────────────
function OurPeoplePage({ navigate, onBook }: {navigate:(p:string)=>void; onBook:()=>void}) {
  const [selected, setSelected] = useState<number|null>(null)
  return (
    <main className="pt-20 page-enter">
      <section className="relative py-28 overflow-hidden" style={{background:'#1a1a2e'}}>
        <div className="absolute inset-0 opacity-20"><img src={IMG.team} alt="" className="w-full h-full object-cover" aria-hidden /></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center anim-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-300 mb-4">Our Team</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white mb-6">The People Behind the Practice</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Our strength is built on people who combine legal knowledge, professional discipline, strategic thinking, and a commitment to client service.</p>
        </div>
      </section>
      <section className="py-8 border-b border-gray-100" style={{background:'#f5f5f8'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 leading-relaxed">The Gazelle Associate team brings together experienced legal professionals across diverse areas of Nigerian law, committed to excellence, client service, and the highest standards of professional conduct.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member,i) => (
              <Reveal key={i} className={`reveal-delay-${i%3+1}`}>
                <div className="group rounded-2xl overflow-hidden border border-gray-100 card-hover cursor-pointer bg-white" onClick={()=>setSelected(selected===i?null:i)}>
                  <div className="h-72 img-zoom">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-5">
                    <h2 className="font-serif text-xl mb-0.5" style={{color:'#1a1a2e'}}>{member.name}</h2>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:'#9291a5'}}>{member.title}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.expertise.map(e=>(
                        <span key={e} className="text-xs px-2 py-0.5 rounded-md" style={{background:'#eeeef8',color:'#3E3D7C'}}>{e}</span>
                      ))}
                    </div>
                    {selected===i ? (
                      <div className="anim-fade-up">
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.summary}</p>
                        <p className="text-xs text-gray-500 mb-1"><strong>Education:</strong> {member.education}</p>
                        <p className="text-xs text-gray-500 mb-4"><strong>Languages:</strong> {member.languages}</p>
                        <button onClick={e=>{e.stopPropagation();onBook()}} className="w-full py-2.5 rounded-xl text-xs font-semibold text-white" style={{background:'#3E3D7C'}}>Book Appointment</button>
                      </div>
                    ) : (
                      <button className="flex items-center gap-1.5 text-xs font-semibold transition-colors" style={{color:'#3E3D7C'}}>View Profile <Icon.arrowRight /></button>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16" style={{background:'#3E3D7C'}}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl text-white mb-4">Join Our Team</h2>
            <p className="text-indigo-200 mb-6 text-sm">We are always looking for exceptional lawyers to join Gazelle Associate.</p>
            <button onClick={()=>navigate('careers')} className="px-8 py-4 rounded-xl font-semibold text-sm bg-white transition-all hover:scale-105" style={{color:'#3E3D7C'}}>View Career Opportunities</button>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

// ─── INSIGHTS PAGE ────────────────────────────────────────────────────────────
function InsightsPage({ navigate }: {navigate:(p:string)=>void}) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const cats = ['All','Corporate Law','Finance & Investment','Property & Real Estate','Compliance']
  const filtered = INSIGHTS.filter(a=>(category==='All'||a.category===category)&&(!search||a.title.toLowerCase().includes(search.toLowerCase())))
  return (
    <main className="pt-20 page-enter">
      <section className="relative py-28 overflow-hidden" style={{background:'#1a1a2e'}}>
        <div className="absolute inset-0 opacity-20"><img src={IMG.meeting} alt="" className="w-full h-full object-cover" aria-hidden /></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center anim-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-300 mb-4">Insights</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white mb-4">Gazelle Insights</h1>
          <p className="font-serif text-xl text-indigo-200 italic mb-4">Law. Business. Regulation. Perspective.</p>
          <p className="text-gray-300 max-w-2xl mx-auto">Commentary and analysis on legal and business developments relevant to our clients and the wider professional community.</p>
        </div>
      </section>
      <section className="py-8 border-b border-gray-100" style={{background:'#f5f5f8'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 leading-relaxed">Gazelle Insights explores developments in corporate law, business regulation, property, employment, technology, and the issues shaping Nigeria's legal and commercial landscape.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <div className="rounded-2xl overflow-hidden cursor-pointer group grid lg:grid-cols-2 border border-gray-100 card-hover" onClick={()=>navigate(`insight/${INSIGHTS[0].slug}`)}>
              <div className="h-64 lg:h-auto img-zoom"><img src={INSIGHTS[0].img} alt={INSIGHTS[0].title} className="w-full h-full object-cover" /></div>
              <div className="p-8 flex flex-col justify-center" style={{background:'#eeeef8'}}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{background:'#3E3D7C'}}>Featured</span>
                  <span className="text-xs text-gray-500">{INSIGHTS[0].readTime}</span>
                </div>
                <h2 className="font-serif text-3xl mb-3 leading-snug group-hover:text-indigo-700 transition-colors" style={{color:'#1a1a2e'}}>{INSIGHTS[0].title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{INSIGHTS[0].excerpt}</p>
                <p className="text-xs text-gray-400">{INSIGHTS[0].date}</p>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex gap-2 flex-wrap">
              {cats.map(c=>(
                <button key={c} onClick={()=>setCategory(c)} className="px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{background:category===c?'#3E3D7C':'#f5f5f8', color:category===c?'white':'#1a1a2e'}}>
                  {c}
                </button>
              ))}
            </div>
            <div className="sm:ml-auto flex items-center gap-2 border-2 rounded-xl px-4 py-2" style={{borderColor:search?'#3E3D7C':'#e5e5f0'}}>
              <Icon.eye />
              <input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search insights..." className="text-sm outline-none w-48" />
            </div>
          </div>
          {filtered.length>0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a,i)=>(
                <article key={a.slug} className="insight-card bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover cursor-pointer group"
                  onClick={()=>navigate(`insight/${a.slug}`)}
                  style={{animation:`fadeUp 0.5s cubic-bezier(.22,1,.36,1) ${i*0.07}s both`}}>
                  <div className="overflow-hidden h-48"><img src={a.img} alt={a.title} className="insight-img w-full h-full object-cover" /></div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{background:'#eeeef8',color:'#3E3D7C'}}>{a.category}</span>
                      <span className="text-xs text-gray-400">{a.readTime}</span>
                    </div>
                    <h3 className="font-serif text-base mb-2 leading-snug group-hover:text-indigo-700 transition-colors" style={{color:'#1a1a2e'}}>{a.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{a.excerpt}</p>
                    <p className="text-xs text-gray-400 mt-3">{a.date}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm mb-4">No insights found.</p>
              <button onClick={()=>{setSearch('');setCategory('All')}} className="text-sm font-medium" style={{color:'#3E3D7C'}}>Clear filters</button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

// ─── INSIGHT DETAIL ───────────────────────────────────────────────────────────
function InsightDetailPage({ slug, navigate, onBook }: {slug:string; navigate:(p:string)=>void; onBook:()=>void}) {
  const article = INSIGHTS.find(a=>a.slug===slug)||INSIGHTS[0]
  const [progress, setProgress] = useState(0)
  useEffect(()=>{
    const h=()=>{const el=document.documentElement; setProgress((el.scrollTop/(el.scrollHeight-el.clientHeight))*100)}
    window.addEventListener('scroll',h,{passive:true}); return ()=>window.removeEventListener('scroll',h)
  },[])
  return (
    <main className="pt-20 page-enter">
      <div className="fixed top-0 left-0 z-[101] h-0.5 reading-progress" style={{width:`${progress}%`,background:'#3E3D7C'}} />
      <section className="py-20" style={{background:'#1a1a2e'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 anim-fade-up">
          <button onClick={()=>navigate('insights')} className="flex items-center gap-2 text-sm text-indigo-300 mb-6 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> All Insights
          </button>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{background:'#3E3D7C'}}>{article.category}</span>
            <span className="text-xs text-gray-400">{article.readTime}</span>
            <span className="text-xs text-gray-400">{article.date}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 leading-tight">{article.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">{article.excerpt}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <article className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden mb-8 img-zoom" style={{height:'360px'}}>
                <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-700 leading-relaxed text-base mb-5">{article.content}</p>
              <p className="text-gray-700 leading-relaxed mb-5">Understanding the legal landscape is essential for businesses and individuals operating in Nigeria. Our lawyers regularly advise clients on matters precisely like these, providing clarity and practical guidance on complex legal issues.</p>
              <h2 className="font-serif text-2xl mb-4 mt-8" style={{color:'#1a1a2e'}}>Key Takeaways</h2>
              <ul className="space-y-3 mb-8">
                {['Engage qualified legal counsel early — prevention is more cost-effective than litigation.','Ensure your legal documentation is clear, well-drafted, and tailored to your specific circumstances.','Stay informed of regulatory developments that affect your business or personal affairs.','Act promptly when legal issues arise — delays can significantly limit your options.'].map((pt,i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:'#eeeef8',color:'#3E3D7C'}}><Icon.checkCircle /></div>
                    <span className="text-sm text-gray-700">{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl p-6" style={{background:'#eeeef8'}}>
                <p className="text-sm text-gray-600 leading-relaxed italic"><strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute legal advice.</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <span className="text-xs text-gray-500 font-medium">Share:</span>
                {['LinkedIn','Twitter / X','Copy Link'].map(s=>(
                  <button key={s} className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all hover:scale-105" style={{borderColor:'#e5e5f0',color:'#3E3D7C'}}>{s}</button>
                ))}
              </div>
            </article>
            <aside>
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl p-6" style={{background:'#eeeef8'}}>
                  <h3 className="font-serif text-lg mb-3" style={{color:'#1a1a2e'}}>Need Legal Advice?</h3>
                  <p className="text-sm text-gray-600 mb-4">Our lawyers are ready to discuss your matter confidentially.</p>
                  <button onClick={onBook} className="w-full py-3 rounded-xl text-sm font-semibold text-white mb-2 transition-all hover:scale-105" style={{background:'#3E3D7C'}}>Book a Consultation</button>
                  <a href="https://wa.me/2347034240634" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold border-2 transition-colors" style={{borderColor:'#3E3D7C',color:'#3E3D7C'}}>
                    <Icon.whatsapp /> WhatsApp Us
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-3" style={{color:'#1a1a2e'}}>More Insights</h3>
                  <div className="space-y-4">
                    {INSIGHTS.filter(a=>a.slug!==article.slug).slice(0,3).map(a=>(
                      <button key={a.slug} onClick={()=>navigate(`insight/${a.slug}`)} className="block text-left group w-full">
                        <p className="text-sm font-medium group-hover:text-indigo-700 transition-colors leading-snug" style={{color:'#1a1a2e'}}>{a.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{a.date}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

// ─── CAREERS PAGE ─────────────────────────────────────────────────────────────
function CareersPage() {
  const [applying, setApplying] = useState<string|null>(null)
  const [form, setForm] = useState({name:'',email:'',phone:'',role:'',message:''})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string,string>>({})
  const roles = [
    {title:'Legal Intern',          type:'Internship',          location:'Lagos',         desc:'Three to six month placement for law students in their penultimate or final year.'},
    {title:'Law School Trainee',    type:'Placement',           location:'Lagos',         desc:'Structured placement for Nigerian Law School students seeking pupillage experience.'},
    {title:'Associate Lawyer',      type:'Full-time',           location:'Lagos',         desc:'Entry-level associate position for newly called lawyers with strong academic backgrounds.'},
    {title:'Senior Associate',      type:'Full-time',           location:'Lagos',         desc:'Experienced lawyer with 4–7 years post-call experience in corporate, commercial, or litigation practice.'},
    {title:'Legal Research Associate',type:'Part-time / Contract',location:'Remote / Lagos',desc:'Research and writing role for exceptional lawyers with strong academic and analytical skills.'},
  ]
  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.name.trim()) e.name='Required'
    if (!form.email.trim()||!/\S+@\S+\.\S+/.test(form.email)) e.email='Valid email required'
    if (!form.role) e.role='Please select a role'
    setErrors(e); return Object.keys(e).length===0
  }
  return (
    <main className="pt-20 page-enter">
      <section className="relative py-28 overflow-hidden" style={{background:'#1a1a2e'}}>
        <div className="absolute inset-0 opacity-20"><img src={IMG.office} alt="" className="w-full h-full object-cover" aria-hidden /></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center anim-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-300 mb-4">Careers</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white mb-6">Build Your Career With Us</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">We believe the future of the legal profession depends on developing exceptional people.</p>
        </div>
      </section>
      <section className="py-8 border-b border-gray-100" style={{background:'#f5f5f8'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 leading-relaxed">Gazelle Associate welcomes applications from motivated lawyers, law students, and legal professionals committed to excellence. We offer internships, placements, associate positions, and senior roles across diverse practice areas.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 mb-20">
            <Reveal dir="left">
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{color:'#3E3D7C'}}>Why Join Us</p>
              <h2 className="font-serif text-4xl mb-6" style={{color:'#1a1a2e'}}>Why Join Gazelle Associate?</h2>
              <div className="space-y-4">
                {['Work across diverse and challenging areas of law','Gain practical legal experience from day one','Learn from experienced senior professionals','Participate in meaningful client matters','Develop commercial awareness beyond pure legal knowledge','Build lasting professional relationships','Grow within a structured, supportive environment'].map((item,i)=>(
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:'#eeeef8',color:'#3E3D7C'}}><Icon.checkCircle /></div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal dir="right" className="reveal-delay-2">
              <div className="rounded-2xl overflow-hidden img-zoom" style={{height:'420px'}}>
                <img src={IMG.meeting} alt="Professional team meeting" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
          <Reveal>
            <h2 className="font-serif text-3xl mb-6" style={{color:'#1a1a2e'}}>Current Opportunities</h2>
            <div className="space-y-4">
              {roles.map((role,i)=>(
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold" style={{color:'#1a1a2e'}}>{role.title}</h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{background:'#eeeef8',color:'#3E3D7C'}}>{role.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                        <Icon.mapPin />
                        {role.location}
                      </div>
                      <p className="text-sm text-gray-600">{role.desc}</p>
                    </div>
                    <button onClick={()=>{setApplying(role.title);setForm(f=>({...f,role:role.title}))}}
                      className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105" style={{background:'#3E3D7C'}}>
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {applying && !submitted && (
        <section className="py-16" style={{background:'#f5f5f8'}}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg anim-scale-in">
              <h2 className="font-serif text-2xl mb-2" style={{color:'#1a1a2e'}}>Apply — {applying}</h2>
              <p className="text-sm text-gray-500 mb-6">Complete the form below. We will review your application within 5–7 business days.</p>
              <div className="grid gap-4">
                {[{label:'Full Name *',key:'name',type:'text',val:form.name,set:(v:string)=>setForm(f=>({...f,name:v}))},{label:'Email Address *',key:'email',type:'email',val:form.email,set:(v:string)=>setForm(f=>({...f,email:v}))},{label:'Phone Number',key:'phone',type:'tel',val:form.phone,set:(v:string)=>setForm(f=>({...f,phone:v}))}].map(({label,key,type,val,set})=>(
                  <div key={key}>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">{label}</label>
                    <input type={type} value={val} onChange={e=>set(e.target.value)} className="w-full border-2 rounded-xl px-4 py-3 text-sm outline-none" style={{borderColor:errors[key]?'#ef4444':val?'#3E3D7C':'#e5e5f0'}} />
                    {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Position *</label>
                  <select value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} className="w-full border-2 rounded-xl px-4 py-3 text-sm outline-none appearance-none" style={{borderColor:errors.role?'#ef4444':form.role?'#3E3D7C':'#e5e5f0'}}>
                    <option value="">Select a role</option>
                    {roles.map(r=><option key={r.title}>{r.title}</option>)}
                  </select>
                  {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Cover Letter / Message</label>
                  <textarea rows={4} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Tell us about yourself..." className="w-full border-2 rounded-xl px-4 py-3 text-sm outline-none resize-none" style={{borderColor:'#e5e5f0'}} />
                </div>
                <p className="text-xs text-gray-500 p-3 rounded-xl leading-relaxed" style={{background:'#f5f5f8'}}>You may also email your CV directly to <strong>careers@gazelleassociate.com</strong>.</p>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={()=>setApplying(null)} className="px-5 py-3 rounded-xl text-sm font-medium border-2" style={{borderColor:'#e5e5f0',color:'#9291a5'}}>Cancel</button>
                <button onClick={()=>{if(validate())setSubmitted(true)}} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white" style={{background:'#3E3D7C'}}>Submit Application</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {submitted && (
        <section className="py-16" style={{background:'#f5f5f8'}}>
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl p-10 shadow-lg anim-scale-in">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{background:'#eeeef8',color:'#3E3D7C'}}><Icon.checkCircle /></div>
              <h3 className="font-serif text-2xl mb-3" style={{color:'#3E3D7C'}}>Application Submitted</h3>
              <p className="text-sm text-gray-600 mb-6">Thank you. We will review your application and contact you within 5–7 business days.</p>
              <button onClick={()=>{setSubmitted(false);setApplying(null)}} className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{background:'#3E3D7C'}}>Done</button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ onBook }: {onBook:()=>void}) {
  const [form, setForm] = useState({name:'',email:'',phone:'',org:'',area:'',message:''})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string,string>>({})
  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.name.trim()) e.name='Required'
    if (!form.email.trim()||!/\S+@\S+\.\S+/.test(form.email)) e.email='Valid email required'
    if (!form.message.trim()) e.message='Please describe your matter'
    setErrors(e); return Object.keys(e).length===0
  }
  const contactItems = [
    {Icon:Icon.mapPin,  label:'Office',   content:'Lagos, Nigeria', sub:'(Full address — placeholder)', href:undefined},
    {Icon:Icon.phone,   label:'Phone',    content:'+234 703 424 0634', href:'tel:+2347034240634'},
    {Icon:Icon.mail,    label:'Email',    content:'info@gazelleassociate.com', href:'mailto:info@gazelleassociate.com'},
    {Icon:Icon.whatsapp,label:'WhatsApp', content:'+234 703 424 0634', href:'https://wa.me/2347034240634'},
  ]
  return (
    <main className="pt-20 page-enter">
      <section className="relative py-28 overflow-hidden" style={{background:'#1a1a2e'}}>
        <div className="absolute inset-0 opacity-20"><img src={IMG.consult} alt="" className="w-full h-full object-cover" aria-hidden /></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center anim-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-300 mb-4">Contact</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white mb-6">Let's Talk</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Legal matters are often time-sensitive. Whether you require legal advice, representation, or consultation, we invite you to contact us.</p>
        </div>
      </section>
      <section className="py-8 border-b border-gray-100" style={{background:'#f5f5f8'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 leading-relaxed">Contact Gazelle Associate for legal advice, consultation bookings, corporate enquiries, or career applications. We respond to all enquiries promptly during business hours (Monday–Friday, 9:00 AM – 5:00 PM WAT).</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <Reveal>
              <h2 className="font-serif text-2xl mb-6" style={{color:'#1a1a2e'}}>General Enquiries</h2>
              <address className="not-italic space-y-3 mb-6">
                {contactItems.map((c,i)=>(
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl group hover:shadow-md transition-all" style={{background:'#f5f5f8'}}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-indigo-700" style={{background:'#3E3D7C',color:'white'}}><c.Icon /></div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" className="text-sm font-medium transition-colors hover:text-indigo-700" style={{color:'#3E3D7C'}}>{c.content}</a>
                      ) : (
                        <p className="text-sm font-medium text-gray-700">{c.content}</p>
                      )}
                      {c.sub && <p className="text-xs text-gray-400 italic">{c.sub}</p>}
                    </div>
                  </div>
                ))}
              </address>
              <div className="p-4 rounded-xl border" style={{borderColor:'#e5e5f0'}}>
                <p className="font-semibold text-xs mb-1" style={{color:'#1a1a2e'}}>Business Hours</p>
                <p className="text-xs text-gray-500">Monday – Friday: 9:00 AM – 5:00 PM (WAT)</p>
                <p className="text-xs text-gray-400">Closed on public holidays</p>
              </div>
              <div className="mt-6 rounded-2xl overflow-hidden h-48 img-zoom">
                <img src={IMG.building} alt="Lagos Nigeria" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <div className="lg:col-span-2">
              <Reveal className="reveal-delay-2">
                {!submitted ? (
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="font-serif text-2xl mb-2" style={{color:'#1a1a2e'}}>Send an Enquiry</h2>
                    <p className="text-sm text-gray-500 mb-6">We will respond within one business day.</p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      {[{label:'Full Name *',key:'name',type:'text',val:form.name,set:(v:string)=>setForm(f=>({...f,name:v}))},{label:'Email Address *',key:'email',type:'email',val:form.email,set:(v:string)=>setForm(f=>({...f,email:v}))},{label:'Phone Number',key:'phone',type:'tel',val:form.phone,set:(v:string)=>setForm(f=>({...f,phone:v}))},{label:'Organisation (Optional)',key:'org',type:'text',val:form.org,set:(v:string)=>setForm(f=>({...f,org:v}))}].map(({label,key,type,val,set})=>(
                        <div key={key}>
                          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">{label}</label>
                          <input type={type} value={val} onChange={e=>set(e.target.value)} className="w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors" style={{borderColor:errors[key]?'#ef4444':val?'#3E3D7C':'#e5e5f0'}} />
                          {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
                        </div>
                      ))}
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Practice Area (Optional)</label>
                      <select value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))} className="w-full border-2 rounded-xl px-4 py-3 text-sm outline-none appearance-none" style={{borderColor:'#e5e5f0'}}>
                        <option value="">Select if applicable</option>
                        {PRACTICE_AREAS.map(pa=><option key={pa.slug}>{pa.title}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Your Matter *</label>
                      <textarea rows={5} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Please briefly describe your legal matter or enquiry..." className="w-full border-2 rounded-xl px-4 py-3 text-sm outline-none resize-none" style={{borderColor:errors.message?'#ef4444':form.message?'#3E3D7C':'#e5e5f0'}} />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                    </div>
                    <div className="p-4 rounded-xl text-xs text-gray-500 leading-relaxed mb-5" style={{background:'#f5f5f8'}}>
                      <strong>Important Notice:</strong> Submitting an enquiry through this website does not automatically create a lawyer-client relationship. A formal engagement will only arise upon completion of the firm's applicable onboarding and engagement process.
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button onClick={()=>{if(validate())setSubmitted(true)}} className="flex-1 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105" style={{background:'#3E3D7C'}}>Send Enquiry</button>
                      <button onClick={onBook} className="py-4 px-6 rounded-xl text-sm font-semibold border-2 transition-all hover:scale-105" style={{borderColor:'#3E3D7C',color:'#3E3D7C'}}>Book Consultation</button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100 anim-scale-in">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{background:'#eeeef8',color:'#3E3D7C'}}><Icon.checkCircle /></div>
                    <h3 className="font-serif text-2xl mb-3" style={{color:'#3E3D7C'}}>Enquiry Received</h3>
                    <p className="text-sm text-gray-600 mb-6">Thank you, {form.name}. We will respond to <strong>{form.email}</strong> within one business day.</p>
                    <button onClick={()=>setSubmitted(false)} className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{background:'#3E3D7C'}}>Send Another Enquiry</button>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingArea, setBookingArea] = useState('')

  const navigate = useCallback((page: string) => {
    setCurrentPage(page)
    window.scrollTo({top:0,behavior:'smooth'})
  }, [])

  const openBooking = useCallback((area = '') => {
    setBookingArea(area); setBookingOpen(true)
  }, [])

  const renderPage = () => {
    if (currentPage === 'home') return <HomePage navigate={navigate} onBook={()=>openBooking()} />
    if (currentPage === 'about') return <AboutPage navigate={navigate} onBook={()=>openBooking()} />
    if (currentPage === 'practice-areas') return <PracticeAreasPage navigate={navigate} onBook={()=>openBooking()} />
    if (currentPage.startsWith('practice-area/')) return <PracticeAreaDetailPage slug={currentPage.replace('practice-area/','')} navigate={navigate} onBook={()=>openBooking()} />
    if (currentPage === 'our-people') return <OurPeoplePage navigate={navigate} onBook={()=>openBooking()} />
    if (currentPage === 'insights') return <InsightsPage navigate={navigate} />
    if (currentPage.startsWith('insight/')) return <InsightDetailPage slug={currentPage.replace('insight/','')} navigate={navigate} onBook={()=>openBooking()} />
    if (currentPage === 'careers') return <CareersPage />
    if (currentPage === 'contact') return <ContactPage onBook={()=>openBooking()} />
    return <HomePage navigate={navigate} onBook={()=>openBooking()} />
  }

  return (
    <div style={{fontFamily:'var(--font-sans)'}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':['LegalService','LocalBusiness'],name:'Gazelle Associate',description:'A modern full-service Nigerian law firm.',url:'https://gazelleassociate.com',telephone:'+2347034240634',email:'info@gazelleassociate.com',address:{'@type':'PostalAddress',addressLocality:'Lagos',addressCountry:'NG'}})}} />
      <Header currentPage={currentPage} navigate={navigate} onBook={()=>openBooking()} />
      {renderPage()}
      <Footer navigate={navigate} onBook={()=>openBooking()} />
      <FloatingButton onBook={()=>openBooking()} />
      <CookieConsent />
      {bookingOpen && <BookingModal initialArea={bookingArea} onClose={()=>{setBookingOpen(false);setBookingArea('')}} />}
    </div>
  )
}
