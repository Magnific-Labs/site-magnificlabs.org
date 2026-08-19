/* @ds-bundle: {"format":4,"namespace":"MagnificLabsDesignSystem_68b9a0","components":[{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"components/feedback/Badge.jsx":"aa48d01c2260","components/feedback/Dialog.jsx":"0e79b768e648","components/feedback/Tag.jsx":"89d2ae470b81","components/feedback/Toast.jsx":"0aacba493262","components/feedback/Tooltip.jsx":"bd0e504fdd31","components/forms/Button.jsx":"a1d6dd57f9f3","components/forms/Checkbox.jsx":"269fa4cb1323","components/forms/IconButton.jsx":"dcec0ec69f1f","components/forms/Input.jsx":"d7342601b5e2","components/forms/Radio.jsx":"1404601e124a","components/forms/Select.jsx":"4d4249de96ff","components/forms/Switch.jsx":"75ccdcf097f7","components/navigation/Tabs.jsx":"cb0ada800e62","components/surfaces/Card.jsx":"61833d73cefb","ui_kits/notepad/notes-data.jsx":"09a106c1e3df","ui_kits/website/Site.jsx":"d26c6ca9b8bb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MagnificLabsDesignSystem_68b9a0 = window.MagnificLabsDesignSystem_68b9a0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/feedback/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    bg: 'var(--surface-sunken)',
    color: 'var(--text-secondary)'
  },
  brand: {
    bg: 'var(--accent-soft)',
    color: 'var(--brand-700)'
  },
  success: {
    bg: 'var(--success-soft)',
    color: 'var(--success)'
  },
  info: {
    bg: 'var(--info-soft)',
    color: 'var(--info)'
  },
  warning: {
    bg: 'var(--warning-soft)',
    color: 'var(--warning)'
  },
  danger: {
    bg: 'var(--danger-soft)',
    color: 'var(--danger)'
  }
};
function Badge({
  tone = 'neutral',
  children
}) {
  const t = TONES[tone] || TONES.neutral;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 22,
      padding: '0 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.color,
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      fontFamily: 'var(--font-display)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  actions
}) {
  if (!open) return null;
  return React.createElement('div', {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(36,29,26,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }
  }, React.createElement('div', {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': title,
    style: {
      width: 420,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      fontFamily: 'var(--font-body)'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-primary)'
    }
  }, title), React.createElement('div', {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-secondary)',
      lineHeight: 'var(--leading-normal)'
    }
  }, children), React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 8
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove,
  color = 'sage'
}) {
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: '0 6px 0 10px',
      borderRadius: 'var(--radius-sm)',
      background: `var(--${color}-100)`,
      color: `var(--${color}-700)`,
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-body)',
      fontWeight: 500
    }
  }, children, onRemove && React.createElement('span', {
    onClick: onRemove,
    style: {
      cursor: 'pointer',
      opacity: 0.6,
      fontSize: 12,
      padding: '2px 4px'
    }
  }, '✕'));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  tone = 'neutral',
  message,
  onClose
}) {
  const TONES = {
    neutral: 'var(--dark-800)',
    success: 'var(--success)',
    danger: 'var(--danger)'
  };
  return React.createElement('div', {
    role: 'status',
    'aria-live': 'polite',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      background: TONES[tone] || TONES.neutral,
      color: '#fff',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)'
    }
  }, message, onClose && React.createElement('span', {
    onClick: onClose,
    style: {
      cursor: 'pointer',
      opacity: 0.7
    }
  }, '✕'));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children
}) {
  const [show, setShow] = React.useState(false);
  return React.createElement('span', {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && React.createElement('span', {
    style: {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--dark-800)',
      color: 'var(--paper-50)',
      fontSize: 'var(--text-xs)',
      fontFamily: 'var(--font-body)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      zIndex: 10
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    h: 36,
    pad: '0 14px',
    font: 'var(--text-sm)'
  },
  md: {
    h: 44,
    pad: '0 20px',
    font: 'var(--text-base)'
  },
  lg: {
    h: 52,
    pad: '0 26px',
    font: 'var(--text-md)'
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--brand-600)',
    color: 'var(--text-inverse)',
    border: 'none',
    hoverBg: 'var(--brand-700)'
  },
  secondary: {
    bg: 'var(--surface-sunken)',
    color: 'var(--text-primary)',
    border: '1px solid var(--surface-border)',
    hoverBg: 'var(--paper-200)'
  },
  ghost: {
    bg: 'transparent',
    color: 'var(--brand-700)',
    border: 'none',
    hoverBg: 'var(--accent-soft)'
  },
  danger: {
    bg: 'var(--danger)',
    color: '#fff',
    border: 'none',
    hoverBg: 'var(--clay-700)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  onClick
}) {
  const s = SIZES[size] || SIZES.md,
    v = VARIANTS[variant] || VARIANTS.primary;
  const [hover, setHover] = React.useState(false);
  return React.createElement('button', {
    disabled,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: s.h,
      padding: s.pad,
      fontSize: s.font,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      background: disabled ? 'var(--surface-sunken)' : hover ? v.hoverBg : v.bg,
      color: disabled ? 'var(--text-tertiary)' : v.color,
      border: v.border,
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background var(--duration-base) var(--ease-standard)',
      minWidth: 44,
      justifyContent: 'center'
    }
  }, leftIcon, children, rightIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-body)',
      opacity: disabled ? 0.5 : 1,
      minHeight: 'var(--target-min)'
    }
  }, React.createElement('span', {
    role: 'checkbox',
    'aria-checked': checked,
    tabIndex: disabled ? -1 : 0,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        !disabled && onChange && onChange(!checked);
      }
    },
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 20,
      height: 20,
      borderRadius: 6,
      border: checked ? 'none' : '1.5px solid var(--surface-border)',
      background: checked ? 'var(--brand-600)' : 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, checked && React.createElement('svg', {
    width: 12,
    height: 12,
    viewBox: '0 0 12 12',
    fill: 'none'
  }, React.createElement('path', {
    d: 'M2 6l3 3 5-6',
    stroke: 'white',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }))), label && React.createElement('span', {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  size = 44,
  variant = 'ghost',
  inverse = false,
  disabled = false,
  onClick,
  label
}) {
  const [hover, setHover] = React.useState(false);
  const bg = variant === 'filled' ? hover ? 'var(--brand-700)' : 'var(--brand-600)' : hover ? inverse ? 'rgba(255,255,255,0.14)' : 'var(--surface-sunken)' : 'transparent';
  const color = variant === 'filled' ? 'var(--text-inverse)' : inverse ? 'var(--paper-100)' : 'var(--text-secondary)';
  return React.createElement('button', {
    'aria-label': label,
    disabled,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-md)',
      border: 'none',
      background: disabled ? 'var(--surface-sunken)' : bg,
      color: disabled ? 'var(--text-tertiary)' : color,
      fontSize: 20,
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  disabled = false
}) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, label && React.createElement('label', {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, label), React.createElement('input', {
    type,
    placeholder,
    value,
    disabled,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    'aria-invalid': !!error,
    style: {
      height: 44,
      padding: '0 14px',
      fontSize: 'var(--text-base)',
      fontFamily: 'inherit',
      color: 'var(--text-primary)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: error ? '1px solid var(--danger)' : focus ? '1px solid var(--brand-500)' : '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: 'box-shadow var(--duration-fast) var(--ease-standard)'
    }
  }), error && React.createElement('span', {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--danger)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  checked = false,
  onChange,
  label,
  disabled = false
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-body)',
      opacity: disabled ? 0.5 : 1,
      minHeight: 'var(--target-min)'
    }
  }, React.createElement('span', {
    role: 'radio',
    'aria-checked': checked,
    tabIndex: disabled ? -1 : 0,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        !disabled && onChange && onChange();
      }
    },
    onClick: () => !disabled && onChange && onChange(),
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: checked ? '6px solid var(--brand-600)' : '1.5px solid var(--surface-border)',
      background: 'var(--surface-card)',
      transition: 'border var(--duration-fast) var(--ease-standard)',
      boxSizing: 'border-box'
    }
  }), label && React.createElement('span', {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  disabled = false
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, label && React.createElement('label', {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, label), React.createElement('select', {
    value,
    onChange,
    disabled,
    style: {
      height: 44,
      padding: '0 14px',
      fontSize: 'var(--text-base)',
      fontFamily: 'inherit',
      color: 'var(--text-primary)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      appearance: 'auto'
    }
  }, options.map(o => React.createElement('option', {
    key: o.value || o,
    value: o.value || o
  }, o.label || o))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)',
      minHeight: 'var(--target-min)'
    }
  }, React.createElement('span', {
    role: 'switch',
    'aria-checked': checked,
    tabIndex: disabled ? -1 : 0,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        !disabled && onChange && onChange(!checked);
      }
    },
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 44,
      height: 26,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--brand-600)' : 'var(--surface-border)',
      position: 'relative',
      transition: 'background var(--duration-base) var(--ease-standard)',
      display: 'inline-block'
    }
  }, React.createElement('span', {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 21 : 3,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--duration-base) var(--ease-out)'
    }
  })), label && React.createElement('span', {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return React.createElement('div', {
    role: 'tablist',
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--surface-border)',
      fontFamily: 'var(--font-display)'
    }
  }, tabs.map(t => React.createElement('button', {
    key: t,
    role: 'tab',
    'aria-selected': t === active,
    onClick: () => onChange && onChange(t),
    style: {
      padding: '12px 18px',
      minHeight: 44,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: t === active ? 'var(--brand-700)' : 'var(--text-secondary)',
      borderBottom: t === active ? '2px solid var(--brand-600)' : '2px solid transparent',
      marginBottom: -1,
      transition: 'color var(--duration-fast) var(--ease-standard)'
    }
  }, t)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function Card({
  title,
  subtitle,
  children,
  padded = true
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: padded ? 20 : 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: 'var(--font-body)'
    }
  }, title && React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      color: 'var(--text-primary)'
    }
  }, title), subtitle && React.createElement('div', {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)'
    }
  }, subtitle), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// ui_kits/notepad/notes-data.jsx
try { (() => {
const NOTES = [{
  id: 1,
  folder: 'Work',
  title: 'Q3 product roadmap',
  preview: 'Ship the pastel redesign, then tackle sync reliability…',
  tagColor: 'sky',
  pinned: true,
  date: 'Today'
}, {
  id: 3,
  folder: 'Work',
  title: 'Standup notes — Aug 18',
  preview: 'Blocked on the ERP invoice export bug. Devtools CLI v2 in review.',
  tagColor: 'sky',
  date: 'Yesterday'
}, {
  id: 6,
  folder: 'Work',
  title: 'Design system audit',
  preview: 'Token names, dark mode contrast, component gaps.',
  tagColor: 'sky',
  date: 'Aug 12'
}, {
  id: 2,
  folder: 'Personal',
  title: 'Reading list',
  preview: 'Klara and the Sun, Braiding Sweetgrass, The Overstory',
  tagColor: 'sage',
  pinned: true,
  date: 'Today'
}, {
  id: 5,
  folder: 'Personal',
  title: 'Recipe: brown butter cookies',
  preview: 'Brown the butter until it smells nutty, not burnt.',
  tagColor: 'sage',
  date: 'Sun'
}, {
  id: 7,
  folder: 'Personal',
  title: 'Gift ideas',
  preview: 'Notebook, plant, tickets to the jazz thing',
  tagColor: 'sage',
  date: 'Aug 10'
}, {
  id: 4,
  folder: 'Travel',
  title: 'Trip to Kyoto',
  preview: 'Book ryokan for the 12th, check cherry blossom forecast',
  tagColor: 'lavender',
  date: 'Mon'
}, {
  id: 8,
  folder: 'Travel',
  title: 'Packing list',
  preview: 'Passport, adapters, the good notebook',
  tagColor: 'lavender',
  date: 'Aug 9'
}, {
  id: 9,
  folder: 'Archive',
  title: '2025 review',
  preview: 'What worked, what to stop doing.',
  tagColor: 'butter',
  date: 'Jan 4'
}];
const FOLDERS = ['Work', 'Personal', 'Travel', 'Archive'];
function NoteEditor({
  note,
  onChange
}) {
  return React.createElement('div', {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 56px',
      overflow: 'auto'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)',
      marginBottom: 14
    }
  }, note.folder + ' / ' + note.title), React.createElement('input', {
    value: note.title,
    'aria-label': 'Note title',
    onChange: e => onChange({
      ...note,
      title: e.target.value
    }),
    style: {
      border: 'none',
      outline: 'none',
      background: 'none',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-3xl)',
      color: 'var(--text-primary)',
      marginBottom: 16
    }
  }), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'var(--text-primary)',
      whiteSpace: 'pre-wrap',
      maxWidth: '68ch'
    }
  }, note.body || note.preview + '\n\nKeep writing — Magnific Notepad autosaves as you type, so there\'s never a save button to think about.'));
}
Object.assign(window, {
  NOTES,
  FOLDERS,
  NoteEditor
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/notepad/notes-data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
const {
  Button,
  Badge,
  Tag
} = window.MagnificLabsDesignSystem_68b9a0;
const PRODUCTS = [{
  name: 'Writing & thinking',
  color: 'sage',
  desc: 'Somewhere to put a thought before it goes. Plain text, no folders to maintain, nothing to save.',
  status: 'Available'
}, {
  name: 'Running a business',
  color: 'sky',
  desc: 'For small teams who outgrew spreadsheets but not their patience. Invoices, stock, the numbers you actually check.',
  status: 'Available'
}, {
  name: 'Building & shipping',
  color: 'lavender',
  desc: 'Deploys, logs and service health in one keyboard-first window. Dark, fast, out of your way.',
  status: 'Beta'
}, {
  name: 'Task Monster',
  color: 'clay',
  desc: 'Decides what you should work on next, then finds the hours for it. You dump in everything you owe people; it sorts, sequences and schedules.',
  status: 'Beta'
}, {
  name: 'Unserious games',
  color: 'butter',
  desc: 'Small, strange games for a spare twenty minutes. Same care, none of the restraint.',
  status: 'Soon'
}];
const PRINCIPLES = [['Quiet by default', 'Nothing badges, pings or asks for you unless you would genuinely want to be interrupted. Work tools stay still; the playful ones are allowed to be alive.'], ['Readable first', 'A 16px floor for body text, a 68-character measure, and a 1.6 line-height on every surface we ship.'], ['Contrast we can prove', 'Every text and background pairing in our products clears WCAG AA — most clear AAA.'], ['Reachable by keyboard', 'Every control is tabbable, has a visible focus ring, and a 44px minimum hit area.'], ['Motion you can turn off', 'Transitions stay under 280ms and disappear entirely when you ask your system for less motion.']];
const PAGE = {
  maxWidth: 1120,
  margin: '0 auto',
  padding: '0 56px'
};
function Wordmark({
  inverse
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 20,
      letterSpacing: '-0.02em',
      color: inverse ? 'var(--paper-0)' : 'var(--brand-700)'
    }
  }, "Magnific", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: inverse ? 'var(--brand-300)' : 'var(--brand-400)'
    }
  }, " Labs"));
}
function Bookmark() {
  return /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark-alpha.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      right: 56,
      width: 132,
      height: 132,
      zIndex: 30,
      boxSizing: 'content-box',
      marginLeft: 40,
      objectFit: 'cover',
      objectPosition: 'top',
      pointerEvents: 'none',
      userSelect: 'none'
    }
  });
}
function SiteNav({
  onNav,
  active
}) {
  const links = ['Products', 'Principles', 'About'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--surface-app)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAGE,
      padding: '20px 56px',
      display: 'flex',
      alignItems: 'center',
      gap: 36
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Main",
    style: {
      display: 'flex',
      gap: 4,
      marginLeft: 'auto',
      marginRight: 180
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => onNav(l),
    style: {
      background: 'none',
      border: 'none',
      padding: '0 14px',
      minHeight: 44,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 16,
      cursor: 'pointer',
      color: l === active ? 'var(--brand-700)' : 'var(--ink-700)',
      boxShadow: l === active ? 'inset 0 -2px 0 var(--brand-600)' : 'none'
    }
  }, l)))));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...PAGE,
      padding: '72px 56px 96px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "Independent software studio"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-4xl)',
      fontWeight: 800,
      margin: '20px 0 22px',
      maxWidth: '18ch',
      lineHeight: 1.05
    }
  }, "Made to be lived with."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'var(--ink-700)',
      lineHeight: 'var(--leading-relaxed)',
      marginBottom: 34,
      maxWidth: '46ch'
    }
  }, "Calm software, carefully made for the job in front of you \u2014 and unserious little games for when the job is done."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg"
  }, "See what we make"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "ghost"
  }, "Read our principles")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      marginTop: 26
    }
  }, "Mac, Windows, Linux, iOS, Android and web. Different shapes, same instincts."));
}
function Products() {
  return /*#__PURE__*/React.createElement("section", {
    id: "products",
    style: {
      ...PAGE,
      padding: '8px 56px 96px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-2xl)',
      fontWeight: 800,
      marginBottom: 10
    }
  }, "Calm tools. Unserious games."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink-700)',
      marginBottom: 48,
      maxWidth: '54ch'
    }
  }, "Each one is shaped around its own job, so they don't all look alike. The care underneath is the same."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      columnGap: 64,
      rowGap: 44
    }
  }, PRODUCTS.map(p => /*#__PURE__*/React.createElement("article", {
    key: p.name,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: `var(--${p.color}-700)`
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 700
    }
  }, p.name), /*#__PURE__*/React.createElement(Badge, {
    tone: p.status === 'Available' ? 'success' : p.status === 'Beta' ? 'info' : 'neutral'
  }, p.status)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--ink-700)',
      lineHeight: 'var(--leading-relaxed)',
      maxWidth: '48ch'
    }
  }, p.desc), /*#__PURE__*/React.createElement("a", {
    href: "#products",
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      alignSelf: 'flex-start'
    }
  }, "Details")))));
}
function Principles() {
  return /*#__PURE__*/React.createElement("section", {
    id: "principles",
    style: {
      ...PAGE,
      padding: '8px 56px 104px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-2xl)',
      fontWeight: 800,
      marginBottom: 10
    }
  }, "What every product owes you"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink-700)',
      marginBottom: 48,
      maxWidth: '54ch'
    }
  }, "Colour and shape belong to each product. These five never change."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, PRINCIPLES.map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'grid',
      gridTemplateColumns: '56px minmax(0,26ch) minmax(0,52ch)',
      gap: 24,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--brand-400)'
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 700
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--ink-700)',
      lineHeight: 'var(--leading-relaxed)',
      maxWidth: 'none'
    }
  }, d)))));
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--brand-900)',
      color: 'var(--paper-100)',
      padding: '56px 0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAGE,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 48,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 300,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    inverse: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--paper-300)',
      lineHeight: 'var(--leading-normal)'
    }
  }, "magnificlabs.org \u2014 a small studio making software worth keeping.")), [['What we make', ['Writing & thinking', 'Running a business', 'Building & shipping', 'Task Monster', 'Unserious games']], ['Company', ['About', 'Principles', 'Careers', 'Contact']], ['Resources', ['Accessibility statement', 'Changelog', 'Status', 'Press kit']]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--brand-300)'
    }
  }, h), items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#products",
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--paper-100)',
      textDecoration: 'none'
    }
  }, i))))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAGE,
      marginTop: 40,
      fontSize: 'var(--text-sm)',
      color: 'var(--paper-300)'
    }
  }, "\xA9 2026 Magnific Labs"));
}
Object.assign(window, {
  SiteNav,
  Hero,
  Products,
  Principles,
  SiteFooter,
  Wordmark,
  Bookmark
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

})();
