import { useState, useRef, useEffect } from 'react'
import './App.css'

/* ===== Figma Assets (correctly exported) ===== */
const figmaAssets = {
  chevron: 'https://www.figma.com/api/mcp/asset/c724d72a-3708-44e4-9113-31b6f9cc31fb',
  moderator: 'https://www.figma.com/api/mcp/asset/35442cc8-9eab-4a56-b4d1-697f2485f8c6',
  micOff: 'https://www.figma.com/api/mcp/asset/f28eb54d-6e09-4a23-91a4-b96a06cc595e',
  logo: 'https://www.figma.com/api/mcp/asset/5f32c8ce-72a6-4cf2-944b-1f8718cfa3b5',
  badge: 'https://www.figma.com/api/mcp/asset/41322037-7bf9-4c12-a76a-e80be5a8e1ad',
}

/* ===== Participant Photos ===== */
const photos = {
  viktorPetrov: 'https://www.figma.com/api/mcp/asset/5a78cfa5-cd7c-40d0-ab17-39f9d745ffdc',
  andreyRevancev: 'https://www.figma.com/api/mcp/asset/d78a1b1e-a432-4563-bd5b-ec776d5452bb',
  egorIvanovAvatar: 'https://www.figma.com/api/mcp/asset/66282f71-9750-49a6-ab10-eda003db8624',
  ivanPetrov: 'https://www.figma.com/api/mcp/asset/b5e8e6d1-7154-4675-af3c-1076f83351ee',
  anastasiaSmirnovа: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop&crop=face',
  viktoriaRezina: 'https://www.figma.com/api/mcp/asset/40863668-b81a-45be-9841-de8fc8139fd0',
  elenaDemyankova: 'https://www.figma.com/api/mcp/asset/2993f053-8c60-4e09-bb50-6d4f47125d63',
}

/* ===== SVG Icons (matching Figma design screenshots) ===== */

// Микрофон
function IconMic() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="white"/>
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="white"/>
    </svg>
  )
}

// Камера (по скриншоту: прямоугольник + треугольник справа)
function IconCamera() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="white"/>
    </svg>
  )
}

// Эмодзи (по скриншоту: круг с глазами-точками и улыбкой)
function IconEmoji() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="white"/>
      <circle cx="9" cy="10" r="1.25" fill="white"/>
      <circle cx="15" cy="10" r="1.25" fill="white"/>
      <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="white"/>
    </svg>
  )
}

// Демонстрация экрана (по скриншоту: монитор с подставкой)
function IconScreenShare() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z" fill="white"/>
    </svg>
  )
}

// Поднятие руки (по скриншоту: открытая ладонь)
function IconHand() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18.5 3.5c-.55 0-1 .45-1 1V11h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v9h-1V1.5c0-.55-.45-1-1-1s-1 .45-1 1V11h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v10.97l-2.77-1.6c-.44-.26-1-.21-1.39.12-.53.45-.6 1.24-.14 1.77L8.13 19c.97 1.18 2.41 1.85 3.94 1.85h3.3c2.74 0 4.13-1.57 4.13-4.09V4.5c0-.55-.45-1-1-1z" fill="white"/>
    </svg>
  )
}

// Три точки — вертикальные (по скриншоту)
function IconMore() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="6" r="1.5" fill="white"/>
      <circle cx="12" cy="12" r="1.5" fill="white"/>
      <circle cx="12" cy="18" r="1.5" fill="white"/>
    </svg>
  )
}

// Завершение звонка (по скриншоту: горизонтальная телефонная трубка)
function IconEndCall() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.956.956 0 01-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28a11.27 11.27 0 00-2.67-1.85.996.996 0 01-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" fill="white"/>
    </svg>
  )
}

// AI-заметки / Искра (по скриншоту: звёздочки)
function IconSparkle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.5 2l1.94 4.06L20.5 8l-4.06 1.94L14.5 14l-1.94-4.06L8.5 8l4.06-1.94L14.5 2zm-11 7l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5 1.5-3zm10 7l1.17 2.33L16 19.5l-2.33 1.17L12.5 23l-1.17-2.33L9 19.5l2.33-1.17L12.5 16z" fill="white"/>
    </svg>
  )
}

// Вид сетки (по скриншоту: 4 квадрата 2x2 с зазорами)
function IconGrid() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill="white"/>
      <rect x="13" y="3" width="8" height="8" rx="1.5" fill="white"/>
      <rect x="3" y="13" width="8" height="8" rx="1.5" fill="white"/>
      <rect x="13" y="13" width="8" height="8" rx="1.5" fill="white"/>
    </svg>
  )
}

// Чат (по скриншоту: облачко с тремя линиями текста)
function IconChat() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="white"/>
      <rect x="7" y="7" width="10" height="1.5" rx="0.75" fill="#1a1a1a"/>
      <rect x="7" y="10.25" width="7" height="1.5" rx="0.75" fill="#1a1a1a"/>
    </svg>
  )
}

// Участники (по скриншоту: два силуэта + плюс)
function IconParticipants() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
    </svg>
  )
}

// Микрофон выключен (для тайлов участников)
function IconMicOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.55-.9l4.17 4.18L21 19.73 4.27 3z" fill="white"/>
    </svg>
  )
}

// Модератор (для тайлов участников)
function IconModerator() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="white"/>
    </svg>
  )
}

/* ===== Participant Data ===== */
const participants = [
  {
    id: 1,
    name: 'Виктор Петров',
    suffix: ' (Вы)',
    hasVideo: true,
    image: photos.viktorPetrov,
    isModerator: true,
    isMicOff: true,
  },
  {
    id: 2,
    name: 'Андрей Реванцев',
    hasVideo: true,
    image: photos.andreyRevancev,
    isSpeaking: true,
  },
  {
    id: 3,
    name: 'Петр Ниничук',
    hasVideo: false,
    initials: 'ПН',
    avatarColor: '#3BABE8',
  },
  {
    id: 4,
    name: 'Мария Попкова',
    hasVideo: false,
    initials: 'МП',
    avatarColor: '#F07D2E',
    isMicOff: true,
  },
  {
    id: 5,
    name: 'Егор Иванов',
    hasVideo: false,
    avatarImage: photos.egorIvanovAvatar,
  },
  {
    id: 6,
    name: 'Иван Петров',
    hasVideo: true,
    image: photos.ivanPetrov,
  },
  {
    id: 7,
    name: 'Анастасия Смирнова',
    hasVideo: true,
    image: photos.anastasiaSmirnovа,
  },
  {
    id: 8,
    name: 'Виктория Резина',
    hasVideo: true,
    image: photos.viktoriaRezina,
    isMicOff: true,
  },
  {
    id: 9,
    name: 'Елена Демянкова',
    hasVideo: true,
    image: photos.elenaDemyankova,
  },
]

/* ===== Video Tile ===== */
function VideoTile({ participant }) {
  const { name, suffix, hasVideo, image, isSpeaking, initials, avatarColor, avatarImage, isModerator, isMicOff } = participant

  const tileClass = [
    'video-tile',
    isSpeaking && 'video-tile--speaking',
    hasVideo && 'video-tile--has-video',
  ].filter(Boolean).join(' ')

  return (
    <div className={tileClass}>
      {hasVideo && image && (
        <img className="video-tile__image" src={image} alt={name} />
      )}
      {!hasVideo && initials && (
        <div className="video-tile__avatar" style={{ background: avatarColor }}>
          {initials}
        </div>
      )}
      {!hasVideo && avatarImage && (
        <div className="video-tile__avatar">
          <img className="video-tile__avatar-image" src={avatarImage} alt={name} />
        </div>
      )}
      <div className="video-tile__name">
        {isModerator && (
          <span className="video-tile__name-icon tooltip-wrap">
            <IconModerator />
            <span className="tooltip">Модератор</span>
          </span>
        )}
        {isMicOff && (
          <span className="video-tile__name-icon"><IconMicOff /></span>
        )}
        <span className="video-tile__name-text">{name}{suffix || ''}</span>
      </div>
    </div>
  )
}

/* ===== Control Button ===== */
function ControlButton({ icon, chevron, text, endCall, compact, badge, onClick, className }) {
  const btnClass = [
    'btn',
    compact && 'btn--compact',
    endCall && 'btn--end-call',
    badge && 'btn--with-badge',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={btnClass} onClick={onClick}>
      <span className="btn__icon">{icon}</span>
      {chevron && (
        <>
          <span className="btn__separator" />
          <span className="btn__chevron">
            <img className="figma-icon" src={figmaAssets.chevron} alt="" />
          </span>
        </>
      )}
      {text && <span className="btn__text">{text}</span>}
      {badge && <span className="btn__badge" />}
    </button>
  )
}

/* ===== Notification Sound ===== */
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  } catch {}
}

/* ===== Join Request Data ===== */
const allJoinRequests = [
  { id: 1, name: 'Андрей Захаров', initials: 'АЗ', color: '#40b259', role: 'Гость' },
  { id: 2, name: 'Ольга Сидорова', initials: 'ОС', color: '#3BABE8', role: 'Гость' },
  { id: 3, name: 'Дмитрий Козлов', initials: 'ДК', color: '#F07D2E', role: 'Гость' },
]

function IconClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12 5.7 16.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" fill="rgba(255,255,255,0.55)"/>
    </svg>
  )
}

function IconAddPerson() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="rgba(255,255,255,0.55)"/>
    </svg>
  )
}

function JoinNotification({ request, onAccept, onDecline, onClose }) {
  return (
    <div className="join-notification">
      <div className="join-notification__avatar" style={{ backgroundColor: request.color }}>
        {request.initials}
      </div>
      <div className="join-notification__info">
        <span className="join-notification__name">{request.name}</span>
        <span className="join-notification__status">Ожидает подключения</span>
      </div>
      <button className="join-notification__action join-notification__action--accept" onClick={onAccept}>
        Принять
      </button>
      <button className="join-notification__action join-notification__action--decline" onClick={onDecline}>
        Отклонить
      </button>
      <button className="join-notification__close" onClick={onClose}>
        <IconClose />
      </button>
    </div>
  )
}

function GroupNotification({ count, onAcceptAll, onView, onClose }) {
  return (
    <div className="join-notification">
      <div className="join-notification__avatar join-notification__avatar--group">
        <IconAddPerson />
      </div>
      <div className="join-notification__info">
        <span className="join-notification__name">{count} запросов</span>
        <span className="join-notification__status">Ожидают подключения</span>
      </div>
      <button className="join-notification__action join-notification__action--accept" onClick={onAcceptAll}>
        Принять всех
      </button>
      <button className="join-notification__action join-notification__action--decline" onClick={onView}>
        Посмотреть
      </button>
      <button className="join-notification__close" onClick={onClose}>
        <IconClose />
      </button>
    </div>
  )
}

/* ===== Sidebar Icons ===== */
function IconDots() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="4" r="1.2" fill="rgba(255,255,255,0.55)"/>
      <circle cx="8" cy="8" r="1.2" fill="rgba(255,255,255,0.55)"/>
      <circle cx="8" cy="12" r="1.2" fill="rgba(255,255,255,0.55)"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#40b259"/>
    </svg>
  )
}

function IconCopy() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="rgba(255,255,255,0.55)"/>
    </svg>
  )
}

function IconChevronUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4.94 10.06L8 7l3.06 3.06 1.06-1.06L8 4.94 3.88 9l1.06 1.06z" fill="rgba(255,255,255,0.55)"/>
    </svg>
  )
}

/* ===== Participants Sidebar ===== */
const sidebarParticipants = [
  { name: 'Иван Петров', isModerator: true, isMicOff: true },
  { name: 'Андрей Резанцев', isMicOff: true },
  { name: 'Алексей Соколов', isMicOff: true },
  { name: 'Дмитрий Орлов', isMicOff: true },
  { name: 'Анна Морозова', isMicOff: true },
  { name: 'Анастасия Смирнова', isMicOff: true },
  { name: 'Андрей Резанцев', isMicOff: true },
  { name: 'Елена Волкова', isMicOff: true },
  { name: 'Сергей Никитин', isMicOff: true },
  { name: 'Виктория Федорова', isMicOff: true },
  { name: 'Наталья Громова', isMicOff: true },
  { name: 'Антон Павлов', isMicOff: true, role: 'Гость' },
  { name: 'Михаил Ковалёв', isMicOff: true },
]

function ParticipantsSidebar({ onClose, pendingUsers, onAcceptUser, onDeclineUser, onAcceptAll }) {
  const [pendingOpen, setPendingOpen] = useState(true)
  const [participantsOpen, setParticipantsOpen] = useState(true)

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__title">Участники</span>
        <button className="sidebar__close" onClick={onClose}>
          <IconClose />
        </button>
      </div>

      <div className="sidebar__content">
        {pendingUsers.length > 0 && (
          <div className="sidebar__section sidebar__section--pending">
            <button className="sidebar__section-header" onClick={() => setPendingOpen(prev => !prev)}>
              <span className="sidebar__section-title">Ожидают подключения ({pendingUsers.length})</span>
              <span className={`sidebar__chevron ${pendingOpen ? '' : 'sidebar__chevron--closed'}`}>
                <IconChevronUp />
              </span>
            </button>
            {pendingOpen && (
              <>
                {pendingUsers.length > 1 && (
                  <button className="sidebar__allow-all" onClick={onAcceptAll}>Разрешить подключение всем</button>
                )}
                {pendingUsers.map((user) => (
                  <div key={user.id} className="sidebar__pending-row">
                    <div className="sidebar__pending-info">
                      <span className="sidebar__participant-name">{user.name}</span>
                      {user.role && <span className="sidebar__participant-role">{user.role}</span>}
                    </div>
                    <button className="sidebar__pending-accept" onClick={() => onAcceptUser(user.id)}><IconCheck /></button>
                    <button className="sidebar__pending-decline" onClick={() => onDeclineUser(user.id)}><IconClose /></button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        <div className="sidebar__section">
          <button className="sidebar__section-header" onClick={() => setParticipantsOpen(prev => !prev)}>
            <span className="sidebar__section-title">Участники ({sidebarParticipants.length})</span>
            <span className={`sidebar__chevron ${participantsOpen ? '' : 'sidebar__chevron--closed'}`}>
              <IconChevronUp />
            </span>
          </button>
          {participantsOpen && sidebarParticipants.map((user, i) => (
            <div key={i} className="sidebar__participant-row">
              <span className="sidebar__participant-name">{user.name}</span>
              {user.isModerator && <span className="tooltip-wrap"><IconModerator /><span className="tooltip">Модератор</span></span>}
              {user.isMicOff && <IconMicOff />}
              <IconDots />
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar__footer">
        <div className="sidebar__link-field">
          <div className="sidebar__link-label">Ссылка на встречу</div>
          <div className="sidebar__link-row">
            <span className="sidebar__link-text">https://web.tdm.mos.ru/call/56...</span>
            <button className="sidebar__link-copy"><IconCopy /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===== Settings Sidebar ===== */
function SettingsSidebar({ onClose, accessMode, setAccessMode, moderatorsAllow, setModeratorsAllow, soundEnabled, setSoundEnabled, notifEnabled, setNotifEnabled }) {
  const disabled = accessMode === 'all'

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__title">Настройки звонка</span>
        <button className="sidebar__close" onClick={onClose}>
          <IconClose />
        </button>
      </div>

      <div className="sidebar__content settings-content">
        <div className="settings-section">
          <div className="settings-label">Подключение к звонку доступно:</div>
          <label className="settings-radio">
            <input type="radio" name="access" checked={accessMode === 'all'} onChange={() => setAccessMode('all')} />
            <span className="settings-radio__dot" />
            <span className="settings-radio__text">Всем</span>
          </label>
          <label className="settings-radio">
            <input type="radio" name="access" checked={accessMode === 'guests_with_permission'} onChange={() => setAccessMode('guests_with_permission')} />
            <span className="settings-radio__dot" />
            <span className="settings-radio__text">Гостям с разрешения</span>
          </label>
          <label className="settings-radio">
            <input type="radio" name="access" checked={accessMode === 'all_with_permission'} onChange={() => setAccessMode('all_with_permission')} />
            <span className="settings-radio__dot" />
            <span className="settings-radio__text">Всем с разрешения</span>
          </label>
        </div>

        <div className={`settings-section ${disabled ? 'settings-section--disabled' : ''}`}>
          <div className="settings-label">Подключение разрешают:</div>
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <span className="settings-toggle-title">Модераторы и пользователи приложения</span>
              <span className="settings-toggle-desc">При отключении функции — только модераторы</span>
            </div>
            <button className={`settings-toggle ${moderatorsAllow && !disabled ? 'settings-toggle--on' : ''}`} disabled={disabled} onClick={() => setModeratorsAllow(prev => !prev)}>
              <span className="settings-toggle__thumb" />
            </button>
          </div>
        </div>

        <div className={`settings-section ${disabled ? 'settings-section--disabled' : ''}`}>
          <div className="settings-label">Звук и уведомление о запросах на подключение</div>
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <span className="settings-toggle-title">Звуковой сигнал</span>
              <span className="settings-toggle-desc">Звуковой сигнал о пользователях, ожидающих разрешения на подключение</span>
            </div>
            <button className={`settings-toggle ${soundEnabled && !disabled ? 'settings-toggle--on' : ''}`} disabled={disabled} onClick={() => setSoundEnabled(prev => !prev)}>
              <span className="settings-toggle__thumb" />
            </button>
          </div>
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <span className="settings-toggle-title">Уведомления</span>
              <span className="settings-toggle-desc">Уведомление о пользователях, ожидающих разрешения на подключение</span>
            </div>
            <button className={`settings-toggle ${notifEnabled && !disabled ? 'settings-toggle--on' : ''}`} disabled={disabled} onClick={() => setNotifEnabled(prev => !prev)}>
              <span className="settings-toggle__thumb" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===== More Menu ===== */
// Виртуальные фоны — лицо в рамке
function IconVirtualBg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="10" r="3" fill="rgba(255,255,255,0.92)"/>
      <path d="M7 19c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

// Настройки звонка — шестерёнка (outline)
function IconSettings() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 00-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.49.49 0 0014 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.49.49 0 00-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 00.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="rgba(255,255,255,0.92)"/>
    </svg>
  )
}

// Режим вебинара — мегафон/рупор
function IconWebinar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1l5 3V6L5 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z" fill="rgba(255,255,255,0.92)"/>
    </svg>
  )
}

function MoreMenu({ onClose, onOpenSettings }) {
  const menuRef = useRef(null)

  const items = [
    { icon: <IconVirtualBg />, label: 'Виртуальные фоны', action: onClose },
    { icon: <IconSettings />, label: 'Настройки звонка', action: onOpenSettings },
    { icon: <IconWebinar />, label: 'Режим «вебинара»', action: onClose },
  ]

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div className="more-menu" ref={menuRef}>
      {items.map((item, i) => (
        <button key={i} className="more-menu__item" onClick={item.action}>
          <span className="more-menu__icon">{item.icon}</span>
          <span className="more-menu__label">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

/* ===== Reactions Panel ===== */
const reactions = ['👋', '❤️', '👍', '👏', '🎉', '🔥', '🤣', '🤔', '😠', '👎', '😭', '💩']

let flyIdCounter = 0

function ReactionsPanel({ onClose, onReact }) {
  const panelRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div className="reactions-panel" ref={panelRef}>
      {reactions.map((emoji) => (
        <button
          key={emoji}
          className="reactions-panel__item"
          onClick={() => onReact(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

/* ===== Flying Emoji ===== */
function FlyingEmoji({ emoji, id, onDone }) {
  const offsetX = useRef(20 + Math.random() * 40)
  const duration = useRef(1.8 + Math.random() * 0.8)

  useEffect(() => {
    const timer = setTimeout(() => onDone(id), duration.current * 1000)
    return () => clearTimeout(timer)
  }, [id, onDone])

  return (
    <div
      className="flying-emoji"
      style={{
        left: `${offsetX.current}px`,
        animationDuration: `${duration.current}s`,
      }}
    >
      {emoji}
    </div>
  )
}

/* ===== App ===== */
function App() {
  const [showReactions, setShowReactions] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [flyingEmojis, setFlyingEmojis] = useState([])
  const emojiButtonRef = useRef(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const showSidebarRef = useRef(false)

  // Settings state (lifted up)
  const [accessMode, setAccessMode] = useState('guests_with_permission')
  const [moderatorsAllow, setModeratorsAllow] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notifEnabled, setNotifEnabled] = useState(true)
  const accessModeRef = useRef('guests_with_permission')
  const soundRef = useRef(true)
  const notifRef = useRef(true)

  // Keep refs in sync
  useEffect(() => { accessModeRef.current = accessMode }, [accessMode])
  useEffect(() => { soundRef.current = soundEnabled }, [soundEnabled])
  useEffect(() => { notifRef.current = notifEnabled }, [notifEnabled])

  // Pending join requests (shared between notification & sidebar)
  const [pendingUsers, setPendingUsers] = useState([])
  const [showNotif, setShowNotif] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const requestIndexRef = useRef(0)
  const timerRef = useRef(null)

  const addNextRequest = () => {
    // "Всем" — гости заходят без запроса
    if (accessModeRef.current === 'all') {
      scheduleNext()
      return
    }

    const req = allJoinRequests[requestIndexRef.current % allJoinRequests.length]
    requestIndexRef.current++
    const newReq = { ...req, id: Date.now() }
    setPendingUsers(prev => [...prev, newReq])

    if (!showSidebarRef.current && notifRef.current) {
      setShowNotif(true)
      setDismissed(false)
    }
    if (!showSidebarRef.current && soundRef.current) {
      playNotificationSound()
    }
    scheduleNext()
  }

  const scheduleNext = () => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(addNextRequest, 8000)
  }

  const dismissNotif = () => {
    setDismissed(true)
    setTimeout(() => setShowNotif(false), 300)
  }

  const handleDismiss = () => {
    dismissNotif()
  }

  const removeUser = (id) => {
    setPendingUsers(prev => {
      const next = prev.filter(u => u.id !== id)
      if (next.length === 0) dismissNotif()
      return next
    })
  }

  const handleAccept = () => {
    if (pendingUsers.length > 0) removeUser(pendingUsers[pendingUsers.length - 1].id)
  }

  const handleDecline = () => {
    if (pendingUsers.length > 0) removeUser(pendingUsers[pendingUsers.length - 1].id)
  }

  const handleAcceptUser = (id) => {
    removeUser(id)
  }

  const handleDeclineUser = (id) => {
    removeUser(id)
  }

  const handleAcceptAll = () => {
    setPendingUsers([])
    dismissNotif()
  }

  const handleViewPending = () => {
    dismissNotif()
    setShowSidebar(true)
    showSidebarRef.current = true
  }

  useEffect(() => {
    timerRef.current = setTimeout(addNextRequest, 3000)
    return () => clearTimeout(timerRef.current)
  }, [])

  // Chat bounce
  const [chatBounce, setChatBounce] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setChatBounce(true)
      setTimeout(() => setChatBounce(false), 1700)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleReact = (emoji) => {
    const id = ++flyIdCounter
    setFlyingEmojis(prev => [...prev, { id, emoji }])
  }

  const handleFlyDone = (id) => {
    setFlyingEmojis(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="video-conference">
      {showNotif && !showSidebar && pendingUsers.length > 0 && (
        <div className={`join-notification-wrapper ${dismissed ? 'join-notification-wrapper--out' : ''}`}>
          {pendingUsers.length === 1 ? (
            <JoinNotification
              request={pendingUsers[0]}
              onAccept={handleAccept}
              onDecline={handleDecline}
              onClose={handleDismiss}
            />
          ) : (
            <GroupNotification
              count={pendingUsers.length}
              onAcceptAll={handleAcceptAll}
              onView={handleViewPending}
              onClose={handleDismiss}
            />
          )}
        </div>
      )}

      {flyingEmojis.map(({ id, emoji }) => (
        <FlyingEmoji key={id} id={id} emoji={emoji} onDone={handleFlyDone} />
      ))}

      <div className="video-conference__body">
        <div className="video-grid">
          {participants.map(p => (
            <VideoTile key={p.id} participant={p} />
          ))}
        </div>

        {showSidebar && (
          <ParticipantsSidebar
            onClose={() => { setShowSidebar(false); showSidebarRef.current = false }}
            pendingUsers={pendingUsers}
            onAcceptUser={handleAcceptUser}
            onDeclineUser={handleDeclineUser}
            onAcceptAll={handleAcceptAll}
          />
        )}
        {showSettings && (
          <SettingsSidebar
            onClose={() => setShowSettings(false)}
            accessMode={accessMode}
            setAccessMode={setAccessMode}
            moderatorsAllow={moderatorsAllow}
            setModeratorsAllow={setModeratorsAllow}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            notifEnabled={notifEnabled}
            setNotifEnabled={setNotifEnabled}
          />
        )}
      </div>

      <div className="control-bar">
        <div className="control-bar__logo" />

        <div className="control-bar__center">
          <ControlButton icon={<IconMic />} chevron />
          <ControlButton icon={<IconCamera />} chevron />
          <div className="emoji-button-wrapper" ref={emojiButtonRef}>
            {showReactions && (
              <ReactionsPanel
                onClose={() => setShowReactions(false)}
                onReact={handleReact}
              />
            )}
            <ControlButton
              icon={<IconEmoji />}
              onClick={() => setShowReactions(prev => !prev)}
            />
          </div>
          <ControlButton icon={<IconScreenShare />} />
          <ControlButton icon={<IconHand />} />
          <div className="more-button-wrapper">
            {showMoreMenu && (
              <MoreMenu
                onClose={() => setShowMoreMenu(false)}
                onOpenSettings={() => { setShowMoreMenu(false); setShowSettings(true); setShowSidebar(false); showSidebarRef.current = false }}
              />
            )}
            <ControlButton icon={<IconMore />} onClick={() => setShowMoreMenu(prev => !prev)} />
          </div>
          <ControlButton icon={<IconEndCall />} endCall />
        </div>

        <div className="control-bar__right">
          <ControlButton icon={<IconSparkle />} compact />
          <ControlButton icon={<IconGrid />} compact />
          <ControlButton icon={<IconChat />} compact badge className={chatBounce ? 'btn--bounce' : ''} />
          <ControlButton icon={<IconParticipants />} text="13" onClick={() => { setShowSidebar(prev => { showSidebarRef.current = !prev; return !prev }); }} />
        </div>
      </div>
    </div>
  )
}

export default App
