import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Building2, CheckCircle2, MessageSquare, Compass, Copy, Check } from 'lucide-react';
import { ContactForm } from '../types';
import { OFFICE_CONTACTS_FA, OFFICE_CONTACTS_EN } from '../data';
import { translations } from '../translations';

interface ContactUsProps {
  lang: 'fa' | 'en';
}

export default function ContactUs({ lang }: ContactUsProps) {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isCopied, setIsCopied] = useState<{ [key: string]: boolean }>({});
  const [isSent, setIsSent] = useState(false);

  const t = translations[lang];
  const officeContacts = lang === 'fa' ? OFFICE_CONTACTS_FA : OFFICE_CONTACTS_EN;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setIsCopied(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setIsSent(true);
  };

  return (
    <section id="contact-us-page" className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Titles */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-red text-xs font-black tracking-widest uppercase block mb-2">{t.contactBadge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
            {t.contactTitle}
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto rounded-full mt-4 mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            {t.contactIntro}
          </p>
        </div>

        {/* Two Columns Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          
          {/* Right Column: Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Central Office Card */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 space-y-4">
              <div className={`flex items-center gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-400">
                    {lang === 'fa' ? 'نشانی دفتر مرکزی اداری' : 'Central Administrative Address'}
                  </h3>
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-white">{t.contactOffice}</h4>
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {officeContacts.centralOffice.address}
              </p>
              
              <div className={`flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3 text-xs sm:text-sm ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold">
                    {lang === 'fa' ? 'تلفن‌های تماس مستقیم' : 'Direct Phone Lines'}
                  </span>
                  {officeContacts.centralOffice.phones.map((ph, idx) => (
                    <a key={idx} href={`tel:${ph}`} className="font-mono font-bold text-brand-red hover:underline mt-0.5">
                      {ph}
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => handleCopy(officeContacts.centralOffice.address, 'office')}
                  className="p-2 rounded-lg bg-white dark:bg-zinc-950 text-zinc-500 hover:text-brand-red transition-all cursor-pointer"
                  title={lang === 'fa' ? 'کپی نشانی دفتر مرکزی' : 'Copy Address'}
                >
                  {isCopied['office'] ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Factory Card */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 space-y-4">
              <div className={`flex items-center gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-400">
                    {lang === 'fa' ? 'آدرس و اطلاعات کارخانه' : 'Factory Address & Info'}
                  </h3>
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-white">{t.contactFactory}</h4>
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {officeContacts.factory.address}
              </p>
              
              <div className={`flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3 text-xs sm:text-sm ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold">
                    {lang === 'fa' ? 'تلفن‌های تماس مستقیم' : 'Direct Phone Lines'}
                  </span>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                    {officeContacts.factory.phones.map((ph, idx) => (
                      <a key={idx} href={`tel:${ph}`} className="font-mono font-bold text-brand-red hover:underline mt-0.5">
                        {ph}
                      </a>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(officeContacts.factory.address, 'factory')}
                  className="p-2 rounded-lg bg-white dark:bg-zinc-950 text-zinc-500 hover:text-brand-red transition-all cursor-pointer"
                  title={lang === 'fa' ? 'کپی آدرس کارخانه' : 'Copy Address'}
                >
                  {isCopied['factory'] ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Shop Card */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 space-y-4">
              <div className={`flex items-center gap-3 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-400">
                    {lang === 'fa' ? 'آدرس فروشگاه قطعات یدکی' : 'Spare Parts Shop Address'}
                  </h3>
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-white">{t.contactShop}</h4>
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {officeContacts.shop.address}
              </p>
              
              <div className={`flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3 text-xs sm:text-sm ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold">
                    {lang === 'fa' ? 'تلفن تماس فروشگاه' : 'Shop Phone Number'}
                  </span>
                  {officeContacts.shop.phones.map((ph, idx) => (
                    <a key={idx} href={`tel:${ph}`} className="font-mono font-bold text-brand-red hover:underline mt-0.5">
                      {ph}
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => handleCopy(officeContacts.shop.address, 'shop')}
                  className="p-2 rounded-lg bg-white dark:bg-zinc-950 text-zinc-500 hover:text-brand-red transition-all cursor-pointer"
                  title={lang === 'fa' ? 'کپی آدرس فروشگاه' : 'Copy Address'}
                >
                  {isCopied['shop'] ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Electronic Mail */}
            <div className={`flex items-center gap-3 p-5 rounded-2xl bg-brand-red/5 dark:bg-brand-red/10 border border-brand-red/10 ${lang === 'fa' ? 'text-right flex-row' : 'text-left flex-row-reverse'}`}>
              <Mail className="w-5 h-5 text-brand-red shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-400 block font-bold">
                  {lang === 'fa' ? 'ارتباط رایانامه‌ای مستقیم' : 'Direct Email Address'}
                </span>
                <a href={`mailto:${officeContacts.general.email}`} className="text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:text-brand-red transition-all">
                  {officeContacts.general.email}
                </a>
              </div>
            </div>

          </div>

          {/* Left Column: Interactive CAD Map Mockup + Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive Map Dashboard */}
            <div className="p-6 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              <div className="relative space-y-4 z-10">
                <div className={`flex items-center justify-between ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span className="text-[10px] font-mono text-zinc-500">MAP INFRASTRUCTURE // LIVE</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                    <span className="text-[10px] font-bold text-brand-red font-mono">GPS ACTIVE</span>
                  </div>
                </div>

                <div className="h-64 rounded-2xl bg-zinc-950 border border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15">
                    {/* Retro Grid Map Mockup */}
                    <svg className="w-full h-full text-brand-red" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 0,100 Q 150,50 300,100 T 600,100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                      <path d="M 50,0 Q 120,150 250,260 T 550,260" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="200" cy="120" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="450" cy="180" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  </div>

                  {/* Pin 1: Office */}
                  <div className={`absolute top-[30%] text-right space-y-1 ${lang === 'fa' ? 'right-[30%]' : 'left-[30%]'}`}>
                    <div className={`flex items-center gap-2 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="w-3.5 h-3.5 rounded-full bg-brand-red flex items-center justify-center text-white ring-4 ring-brand-red/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <span className="text-[11px] font-extrabold bg-zinc-900/95 px-2 py-1 rounded border border-zinc-800 text-white shadow">
                        {lang === 'fa' ? 'دفتر مرکزی میرداماد' : 'Mirdamad Head Office'}
                      </span>
                    </div>
                    <p className="text-[9px] text-zinc-500 font-mono">N 35°45'39.2" E 51°25'53.5"</p>
                  </div>

                  {/* Pin 2: Factory */}
                  <div className={`absolute bottom-[25%] text-right space-y-1 ${lang === 'fa' ? 'left-[20%]' : 'right-[20%]'}`}>
                    <div className={`flex items-center gap-2 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center text-brand-red ring-4 ring-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                      </div>
                      <span className="text-[11px] font-extrabold bg-zinc-900/95 px-2 py-1 rounded border border-zinc-800 text-white shadow">
                        {lang === 'fa' ? 'کارخانه سعیدآباد (جاجرود)' : 'Saeedabad (Jajarood) Factory'}
                      </span>
                    </div>
                    <p className="text-[9px] text-zinc-500 font-mono">N 35°44'12.1" E 51°40'18.8"</p>
                  </div>

                  <div className={`flex items-center justify-between relative z-10 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="flex items-center gap-2">
                      <Compass className="w-5 h-5 text-zinc-400 animate-spin" />
                      <span className="text-xs font-mono text-zinc-400">ORIENTED_NORTH</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{lang === 'fa' ? 'استان تهران' : 'Tehran, Iran'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry form */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-150 dark:border-zinc-800/80 p-8 rounded-3xl shadow-sm">
              {!isSent ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className={`text-lg font-extrabold text-zinc-950 dark:text-white flex items-center gap-2 mb-4 justify-start`}>
                    <MessageSquare className="w-5 h-5 text-brand-red" />
                    <span>{t.contactFormTitle}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                        {lang === 'fa' ? 'نام و نام خانوادگی' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={lang === 'fa' ? 'مثال: رضا محمدی' : 'e.g. John Doe'}
                        className={`w-full text-xs p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                        {lang === 'fa' ? 'تلفن همراه مستقیم' : 'Direct Mobile Number'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder={lang === 'fa' ? 'مثال: 09123456789' : 'e.g. +989123456789'}
                        className="w-full text-xs p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white text-left"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                      {lang === 'fa' ? 'نشانی پست الکترونیک' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="info@imantak.com"
                      className="w-full text-xs p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">{t.contactFormSubject} *</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder={lang === 'fa' ? 'استعلام موجودی قطعه، همکاری فنی...' : 'Quote request, technical cooperation...'}
                      className={`w-full text-xs p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">{t.contactFormMessage} *</label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder={lang === 'fa' ? 'متن خود را در این قسمت یادداشت فرمایید...' : 'Write your message here...'}
                      className={`w-full text-xs p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl text-xs font-bold shadow-md shadow-brand-red/10 cursor-pointer text-center"
                  >
                    {t.contactFormSubmit}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-white">{lang === 'fa' ? 'پیغام شما با موفقیت ارسال شد' : 'Your Message Has Been Sent'}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {lang === 'fa' ? 'شناسه ثبت پیام:' : 'Inquiry ID:'} <span className="font-mono text-brand-red font-bold">MSG-{Math.floor(Math.random() * 80000) + 10000}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
                    {lang === 'fa' ? (
                      'سپاس از شما؛ پیام شما جهت بررسی و پاسخگویی سریع به دپارتمان مربوطه شرکت ایمن تک پیشرو ارجاع گردید. در اسرع وقت پاسخ برای شما ارسال خواهد شد.'
                    ) : (
                      'Thank you. Your message has been routed to the respective department of Iman Tak Pishro. Our team will contact you shortly.'
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setForm({ name: '', phone: '', email: '', subject: '', message: '' });
                    }}
                    className="px-5 py-2.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {lang === 'fa' ? 'ارسال پیام جدید' : 'Send New Message'}
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
