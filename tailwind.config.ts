import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      // Typography System
      fontSize: {
        'heading-xxl': ['var(--fontsize-heading-xxl)', {
          lineHeight: 'var(--lineheight-tight)'
        }],
        'heading-xl': ['var(--fontsize-heading-xl)', {
          lineHeight: 'var(--lineheight-tight)'
        }],
        'heading-lg': ['var(--fontsize-heading-lg)', {
          lineHeight: 'var(--lineheight-tight)'
        }],
        'heading-md': ['var(--fontsize-heading-md)', {
          lineHeight: 'var(--lineheight-tight)'
        }],
        'heading-sm': ['var(--fontsize-heading-sm)', {
          lineHeight: 'var(--lineheight-tight)'
        }],
        'heading-xs': ['var(--fontsize-heading-xs)', {
          lineHeight: 'var(--lineheight-tight)'
        }],
        'body-xl': ['var(--fontsize-body-xl)', {
          lineHeight: 'var(--lineheight-normal)'
        }],
        'body-lg': ['var(--fontsize-body-lg)', {
          lineHeight: 'var(--lineheight-normal)'
        }],
        'body-md': ['var(--fontsize-body-md)', {
          lineHeight: 'var(--lineheight-normal)'
        }],
        'body-sm': ['var(--fontsize-body-sm)', {
          lineHeight: 'var(--lineheight-normal)'
        }],
        'body-xs': ['var(--fontsize-body-xs)', {
          lineHeight: 'var(--lineheight-normal)'
        }],
        'body-xxs': ['var(--fontsize-body-xxs)', {
          lineHeight: 'var(--lineheight-normal)'
        }],
      },
      fontFamily: {
        primary: 'var(--fontfamily-primary)',
        headline: 'var(--fontfamily-headline)',
      },
      fontWeight: {
        regular: 'var(--fontweight-regular)',
        medium: 'var(--fontweight-medium)',
        semibold: 'var(--fontweight-semibold)',
      },
      lineHeight: {
        tight: 'var(--lineheight-tight)',
        normal: 'var(--lineheight-normal)',
        relaxed: 'var(--lineheight-relaxed)',
      },
      letterSpacing: {
        tight: 'var(--letterspacing-tight)',
        normal: 'var(--letterspacing-normal)',
        wide: 'var(--letterspacing-wide)',
      },
      // Color System
      colors: {
        "primary": {
          main: 'var(--primary-main)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
          soft: 'var(--primary-soft)',
          contrast: 'var(--primary-contrast)',
        },
        "secondary": {
          main: 'var(--secondary-main)',
          dark: 'var(--secondary-dark)',
          light: 'var(--secondary-light)',
          soft: 'var(--secondary-soft)',
          contrast: 'var(--secondary-contrast)',
        },
        "accent": {
          main: 'var(--accent-main)',
          dark: 'var(--accent-dark)',
          light: 'var(--accent-light)',
          contrast: 'var(--accent-contrast)',
        },
        "softgrey": {
          main: 'var(--softgrey-main)',
          dark: 'var(--softgrey-dark)',
          light: 'var(--softgrey-light)',
          contrast: 'var(--softgrey-contrast)',
          translucent: 'var(--softgrey-translucent)',
        },
        "hardgrey": {
          main: 'var(--hardgrey-main)',
          dark: 'var(--hardgrey-dark)',
          light: 'var(--hardgrey-light)',
          contrast: 'var(--hardgrey-contrast)',
        },
        "whiteblack": {
          main: 'var(--whiteblack-main)',
          contrast: 'var(--whiteblack-contrast)',
        },
        "success": {
          main: 'var(--success-main)',
          dark: 'var(--success-dark)',
          light: 'var(--success-light)',
          soft: 'var(--success-soft)',
          contrast: 'var(--success-contrast)',
        },
        "warning": {
          main: 'var(--warning-main)',
          dark: 'var(--warning-dark)',
          light: 'var(--warning-light)',
          soft: 'var(--warning-soft)',
          contrast: 'var(--warning-contrast)',
        },
        "critical": {
          main: 'var(--critical-main)',
          dark: 'var(--critical-dark)',
          light: 'var(--critical-light)',
          soft: 'var(--critical-soft)',
          contrast: 'var(--critical-contrast)',
        },
        "error": {
          main: 'var(--error-main)',
          dark: 'var(--error-dark)',
          light: 'var(--error-light)',
          soft: 'var(--error-soft)',
          contrast: 'var(--error-contrast)',
          textonly: 'var(--error-textonly)',
        },
        "common": {
          "black": {
            main: 'var(--common-black-main)',
            contrast: 'var(--common-black-contrast)',
          },
          "white": {
            main: 'var(--common-white-main)',
            contrast: 'var(--common-white-contrast)',
          },
        },
        "_components": {
          "backdrop": {
            fill: 'var(--components-backdrop-fill)',
          },
          "rating": {
            activefill: 'var(--components-rating-activefill)',
            enabledborder: 'var(--components-rating-enabledborder)',
          },
          "alert": {
            "critical": {
              color: 'var(--components-alert-critical-color)',
              background: 'var(--components-alert-critical-background)',
            },
            "high": {
              color: 'var(--components-alert-high-color)',
              background: 'var(--components-alert-high-background)',
            },
            "medium": {
              color: 'var(--components-alert-medium-color)',
              background: 'var(--components-alert-medium-background)',
            },
            "success": {
              color: 'var(--components-alert-success-color)',
              background: 'var(--components-alert-success-background)',
            },
          },
          "avatar": {
            fill: 'var(--components-avatar-fill)',
          },
          "background": {
            default: 'var(--components-background-default)',
            "contrast": {
              xs: 'var(--components-background-contrast-xs)',
              sm: 'var(--components-background-contrast-sm)',
              md: 'var(--components-background-contrast-md)',
            },
            disabled: 'var(--components-background-disabled)',
          },
          "chip": {
            defaultclosefill: 'var(--components-chip-defaultclosefill)',
          },
          "divider": {
            main: 'var(--components-divider-main)',
          },
          "text": {
            primary: 'var(--components-text-primary)',
            secondary: 'var(--components-text-secondary)',
            light: 'var(--components-text-light)',
          },
          "stepper": {
            connector: 'var(--components-stepper-connector)',
          },
          "tooltip": {
            fill: 'var(--components-tooltip-fill)',
          },
        },
        "_native": {
          "scrollbar": {
            bg: 'var(--native-scrollbar-bg)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config; 