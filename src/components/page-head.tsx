export interface PageHeadProps {
  eyebrow?: string
  title: string
  lead?: string
}

/** The heading block every page opens with. */
export function PageHead({ eyebrow, title, lead }: PageHeadProps): JSX.Element {
  return (
    <section class="wrap" style={{ padding: 'clamp(48px,7vw,96px) 0 clamp(24px,3vw,40px)' }}>
      {eyebrow ? (
        <div class="eyebrow" style={{ marginBottom: '16px' }} safe>
          {eyebrow}
        </div>
      ) : null}
      <h1 class="h-lg" style={{ maxWidth: '22ch' }} safe>
        {title}
      </h1>
      {lead ? (
        <p class="lead" style={{ marginTop: '20px' }} safe>
          {lead}
        </p>
      ) : null}
    </section>
  )
}
