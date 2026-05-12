import { useState } from 'react'
import { Send } from 'lucide-react'

const CONTACT_INTRO =
    'サービスに関するご質問、お見積りのご依頼、その他お問い合わせは、下記のフォームからお送りください。'

const CONTACT_DESCRIPTION_ITEMS = [
    'お問い合わせ内容について、原則3営業日以内にメールでご返信いたします。',
    'サービスのご質問・お見積り・ご相談など、内容の制限はありません。',
    '折り返しのご連絡をご希望の場合は、電話番号のご記入をお願いします。',
    '送信後の自動返信メールが届かない場合は、メールアドレスの誤入力や迷惑メールフォルダをご確認ください。',
    '土日祝日・年末年始などの営業時間外にいただいたお問い合わせは、翌営業日以降の対応となります。',
]

export const ContactForm = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const styles = {
        container: 'container mx-auto px-8 py-8 bg-emphasis rounded-2xl',
        label: 'text-white text-start',
        input: 'w-full p-2 rounded-md bg-white focus:outline-none',
        textarea: 'w-full p-2 border border-zinc-300 rounded-md bg-white focus:outline-none',
        button: 'w-full p-2 bg-zinc-900 text-white rounded-md',
    }
  return (
    <form className={styles.container}>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 lg:items-start">
            <div className="flex flex-1 flex-col gap-4 text-start">
                <h1 className="text-2xl font-semibold text-white">Contact</h1>
                <p className="text-white leading-relaxed">{CONTACT_INTRO}</p>
                <ul className="list-disc space-y-2 pl-5 text-sm text-white leading-relaxed marker:text-white">
                    {CONTACT_DESCRIPTION_ITEMS.map((text) => (
                        <li key={text}>{text}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col">
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
                className={styles.input}
                id="name"
                type="text"
                name="name"
                placeholder="名前"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <div className="flex min-w-0 flex-1 flex-col">
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
                className={styles.input}
                id="email"
                type="email"
                name="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
            />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
            <label htmlFor="phone" className={styles.label}>Phone</label>
            <input
                className={styles.input}
                id="phone"
                type="tel"
                name="phone"
                placeholder="電話番号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
            />
            </div>
            </div>
            <div className="flex flex-col">
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <input
                className={styles.input}
                id="subject"
                type="text"
                name="subject"
                placeholder="件名"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
                className={styles.textarea}
                id="message"
                name="message"
                placeholder="問い合わせ内容"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
            />
            </div>
            <div className="flex flex-col">
            <button className="flex items-center gap-2 bg-zinc-900 text-white rounded-md p-2 w-full justify-center hover:bg-zinc-800 transition-colors duration-300 hover:cursor-pointer" type="submit">
                <Send className="size-4" />
                送信する
            </button>
            </div>
            </div>
        </div>
    </form>
  )
}
