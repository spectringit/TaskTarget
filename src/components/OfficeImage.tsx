import { useState } from 'react'
import { getFallbackUrl, useOfficePhoto } from '../hooks/useOfficePhotos'

interface Props {
  alt: string
  className?: string
  idSeed?: string
}

export default function OfficeImage({ alt, className = '', idSeed }: Props) {
  const { url, loading } = useOfficePhoto(idSeed)
  const [errorCount, setErrorCount] = useState(0)
  const src = errorCount > 0 ? getFallbackUrl(`err-${alt}-${errorCount}-${Math.random()}`) : url

  return (
    <div className={`relative aspect-video w-full shrink-0 overflow-hidden bg-slate-100 ${className}`}>
      {(loading || !src) && <div className="absolute inset-0 animate-pulse bg-slate-200" aria-hidden="true" />}
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={() => setErrorCount((n) => n + 1)}
        />
      )}
    </div>
  )
}