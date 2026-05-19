import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import BreadCrumb from '../components/BreadCrumb'
import SpecificPageLayout from '../components/SpecificPageLayout'
import { api } from '../utils/api'
import { formatTimestamp } from '../utils/formatDate'

const Article = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    api
      .get(`/announcement/${id}`)
      .then((response) => {
        if (!cancelled) {
          setArticle(response.data)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setArticle(null)
          setError(err)
        }
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const isCurrentArticle = article && String(article.id) === String(id)
  const isLoading = !error && !isCurrentArticle

  const breadcrumbItems = [
    { label: 'ホーム', to: '/' },
    { label: 'お知らせ', to: '/announcements' },
    ...(isCurrentArticle ? [{ label: article.title }] : []),
  ]

  return (
    <SpecificPageLayout title={article?.title ?? 'お知らせ'} showTitle={false}>
      <BreadCrumb items={breadcrumbItems} />
      <article className="w-full px-8 py-8 text-left">
        {isLoading ? (
          <p className="text-sm text-zinc-500">読み込み中…</p>
        ) : error ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-zinc-600">記事が見つかりませんでした。</p>
            <Link
              to="/announcements"
              className="text-sm text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
            >
              お知らせ一覧に戻る
            </Link>
          </div>
        ) : isCurrentArticle ? (
          <>
            <h1
              className="mt-2 text-2xl font-medium tracking-tight text-zinc-900"
              style={{ fontFamily: '"IBM Plex Sans JP", sans-serif' }}
            >
              {article.title}
            </h1>
            <time
              dateTime={article.created_at}
              className="block text-sm tabular-nums text-zinc-600"
            >
              {formatTimestamp(article.created_at)}
            </time>
            <div className="mt-8 max-w-none text-left text-base leading-relaxed text-zinc-700 [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_p+_p]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
              <Markdown>{article.content}</Markdown>
            </div>
          </>
        ) : null}
      </article>
    </SpecificPageLayout>
  )
}

export default Article
