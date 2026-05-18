import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { api } from '../utils/api'

const CONTACT_INTRO =
    'サービスに関するご質問、お見積りのご依頼、その他お問い合わせは、下記のフォームからお送りください。'

const CONTACT_DESCRIPTION_ITEMS = [
    'お問い合わせ内容について、原則3営業日以内にメールでご返信いたします。',
    'サービスのご質問・お見積り・ご相談など、内容の制限はありません。',
    '折り返しのご連絡をご希望の場合は、電話番号のご記入をお願いします。',
    '送信後の自動返信メールが届かない場合は、メールアドレスの誤入力や迷惑メールフォルダをご確認ください。',
    '土日祝日・年末年始などの営業時間外にいただいたお問い合わせは、翌営業日以降の対応となります。',
]

const easeOutSoft = [0.15, 1, 0.5, 1]

export const ContactForm = () => {
    const reduceMotion = useReducedMotion()

    const layoutTransition = reduceMotion
        ? { duration: 0.05 }
        : {
              type: 'tween',
              duration: 0.55,
              ease: easeOutSoft,
          }

    const crossFadeTransition = reduceMotion
        ? { duration: 0.05 }
        : {
              duration: 0.38,
              ease: easeOutSoft,
          }

    const createContact = async (contact) => {
        const response = await api.post('/contact', contact)
        return response.data
    }

    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const styles = {
        container: 'w-full px-8 py-8 bg-emphasis rounded-2xl overflow-hidden',
        label: 'text-white text-start',
        input: 'w-full p-2 rounded-md bg-white focus:outline-none',
        textarea: 'w-full p-2 border border-zinc-300 rounded-md bg-white focus:outline-none',
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSubmitting) return
        setIsSubmitting(true)
        try {
            await createContact({ name, email, phone, subject, message })
            setSubmitted(true)
        } finally {
            setIsSubmitting(false)
        }
    }

    const sharedSurfaceTransition = reduceMotion
        ? { duration: 0.05 }
        : {
              type: 'spring',
              stiffness: 380,
              damping: 38,
              mass: 0.85,
          }

    return (
        <LayoutGroup>
            <motion.div layout className={styles.container} transition={{ layout: layoutTransition }}>
                <AnimatePresence mode="popLayout" initial={false}>
                    {!submitted ? (
                        <motion.form
                            key="contact-form"
                            layoutId="contact-card-surface"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                opacity: crossFadeTransition,
                                layout: sharedSurfaceTransition,
                            }}
                            className="flex flex-col gap-8 will-change-transform lg:flex-row lg:gap-12 lg:items-start"
                            onSubmit={handleSubmit}
                        >
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
                                <label htmlFor="name" className={styles.label}>
                                    Name
                                </label>
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
                                    <label htmlFor="email" className={styles.label}>
                                        Email
                                    </label>
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
                                    <label htmlFor="phone" className={styles.label}>
                                        Phone
                                    </label>
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
                                <label htmlFor="subject" className={styles.label}>
                                    Subject
                                </label>
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
                                <label htmlFor="message" className={styles.label}>
                                    Message
                                </label>
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
                                <button
                                    className="flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 p-2 text-white transition-colors duration-300 hover:cursor-pointer hover:bg-zinc-800 disabled:pointer-events-none disabled:opacity-60"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    <Send className="size-4" />
                                    {isSubmitting ? '送信中…' : '送信する'}
                                </button>
                            </div>
                        </div>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="contact-success"
                            layoutId="contact-card-surface"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                opacity: crossFadeTransition,
                                layout: sharedSurfaceTransition,
                            }}
                            className="flex flex-col items-center justify-center gap-6 px-4 py-14 text-center sm:py-16"
                        >
                        <motion.div
                            layout="position"
                            initial={{ scale: reduceMotion ? 1 : 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: reduceMotion ? 0 : 0.06,
                                duration: reduceMotion ? 0.05 : 0.4,
                                ease: easeOutSoft,
                            }}
                        >
                            <CheckCircle2
                                className="size-14 text-white sm:size-16"
                                strokeWidth={1.25}
                                aria-hidden
                            />
                        </motion.div>
                        <motion.p
                            layout="position"
                            className="max-w-md text-xl font-semibold text-white sm:text-2xl"
                            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: reduceMotion ? 0 : 0.1,
                                duration: reduceMotion ? 0.05 : 0.38,
                                ease: easeOutSoft,
                            }}
                        >
                            問い合わせを受け付けました
                        </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </LayoutGroup>
    )
}
