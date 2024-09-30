interface IconProps extends React.SVGAttributes<SVGElement> {}

export const Icons = {
  Close: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 6L6 18M6 6l12 12"
      />
    </svg>
  ),
  DotFilled: ({ ...props }: IconProps) => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  DotsVert: ({ ...props }: IconProps) => (
    <svg fill="currentColor" viewBox="8 5 4 10" {...props}>
      <path d="M10 9a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z"></path>
    </svg>
  ),
  Upload: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z" />
    </svg>
  ),
  Grid: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  ),
  Server: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        fill="currentColor"
        x1="6"
        x2="6.01"
        y1="6"
        y2="6"
        className="text-foreground"
      />
      <line
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        fill="currentColor"
        x1="6"
        x2="6.01"
        y1="18"
        y2="18"
        className="text-foreground"
      />
    </svg>
  ),
  Hamburger: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  ),
  Plus: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="currentColor"
      {...props}
    >
      <path
        d="M12 4V20"
        fill="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 12H20" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ChevronRight: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Check: ({ ...props }: IconProps) => (
    <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" {...props}>
      <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
    </svg>
  ),
  Settings: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" className="text-foreground" />
    </svg>
  ),
  Dashboard: ({ ...props }: IconProps) => (
    <svg {...props} viewBox="2.5 2.5 19 19">
      <path
        d="M4 13h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1zm-1 7a1 1 0 001 1h6a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4zm10 0a1 1 0 001 1h6a1 1 0 001-1v-7a1 1 0 00-1-1h-6a1 1 0 00-1 1v7zm1-10h6a1 1 0 001-1V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v5a1 1 0 001 1z"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        fill="none"
      ></path>
    </svg>
  ),
  Projects: ({ ...props }: IconProps) => (
    <svg viewBox="5 5 11 11" {...props}>
      <path
        d="M8.499 5.5l-2 .003a1 1 0 00-1 1V8.5a1 1 0 00.884.993l.118.007 2-.003a1 1 0 00.999-1V6.501a1 1 0 00-.884-.994zm6 0l-2 .003a1 1 0 00-1 1V8.5a1 1 0 00.884.993l.118.007 2-.003a1 1 0 00.999-1V6.501a1 1 0 00-.884-.994zm-6 6l-2 .003a1 1 0 00-1 1V14.5a1 1 0 00.884.993l.118.007 2-.003a1 1 0 00.999-1v-1.996a1 1 0 00-.884-.994zm6 0l-2 .003a1 1 0 00-1 1V14.5a1 1 0 00.884.993l.118.007 2-.003a1 1 0 00.999-1v-1.996a1 1 0 00-.884-.994z"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      ></path>
    </svg>
  )
};
