import React from "react"
import { useTranslation } from "react-i18next"

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent)

  const win = window as unknown as Record<string, unknown>
  const modifyName = (win.FooterModifyName as string) || "QingYun"
  const modifyUrl = (win.FooterModifyUrl as string) || "https://blog.notett.com"

  return (
    <footer className="mx-auto w-full max-w-5xl px-4 lg:px-0 pb-4 server-footer">
      <section className="flex flex-col">
        <section className="mt-1 flex items-center sm:flex-row flex-col justify-between gap-2 text-[13px] font-light tracking-tight text-neutral-600/50 dark:text-neutral-300/50 server-footer-name">
          <div className="flex flex-col items-start gap-1">
            <p>Powered by <a href={"https://github.com/komari-monitor/komari"} target="_blank">Komari Monitor</a></p>
            <p className="text-[11px] opacity-70">
              2026 Modify by <a href={modifyUrl} target="_blank">{modifyName}</a>
            </p>
          </div>
          <div className="server-footer-theme flex flex-col items-center sm:items-end">
            <p className="mt-1 text-[13px] font-light tracking-tight text-neutral-600/50 dark:text-neutral-300/50">
              <kbd className="pointer-events-none mx-1 inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                {isMac ? <span className="text-xs">⌘</span> : "Ctrl "}K
              </kbd>
            </p>
            <section>
              {t("footer.themeBy")}
              <a href={"https://github.com/yutian81/koma-nezha"} target="_blank">
                Koma-Nezha for Komari Theme
              </a>
            </section>
          </div>
        </section>
      </section>
    </footer>
  )
}

export default Footer