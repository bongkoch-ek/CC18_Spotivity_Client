
export function BookmarkLight(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5 6c0-1.4 0-2.1.272-2.635a2.5 2.5 0 011.093-1.093C6.9 2 7.6 2 9 2h6c1.4 0 2.1 0 2.635.272a2.5 2.5 0 011.092 1.093C19 3.9 19 4.6 19 6v13.208c0 1.056 0 1.583-.217 1.856a1 1 0 01-.778.378c-.349.002-.764-.324-1.593-.976L12 17l-4.411 3.466c-.83.652-1.245.978-1.594.976a1 1 0 01-.778-.378C5 20.791 5 20.264 5 19.208V6z"
                fill="#B0CBCB"
            />
        </svg>
    )
}

export function BookmarkDark(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5 6c0-1.4 0-2.1.272-2.635a2.5 2.5 0 011.093-1.093C6.9 2 7.6 2 9 2h6c1.4 0 2.1 0 2.635.272a2.5 2.5 0 011.092 1.093C19 3.9 19 4.6 19 6v13.208c0 1.056 0 1.583-.217 1.856a1 1 0 01-.778.378c-.349.002-.764-.324-1.593-.976L12 17l-4.411 3.466c-.83.652-1.245.978-1.594.976a1 1 0 01-.778-.378C5 20.791 5 20.264 5 19.208V6z"
                fill="#005657"
            />
        </svg>
    )
}

export function SearchIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
            {...props}
            >
            <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
        </svg>
    )
}

export function DeleteIcon(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g
          stroke="#EB3223"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 7h16M6 7v11a3 3 0 003 3h6a3 3 0 003-3V7M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z" />
        </g>
      </svg>
    )
  }

 export function Question(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx={12} cy={12} r={10} stroke="#005657" strokeWidth={1.5} />
        <path
          d="M10.125 8.875a1.875 1.875 0 112.828 1.615c-.475.281-.953.708-.953 1.26V13"
          stroke="#005657"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <circle cx={12} cy={16} r={1} fill="#005657" />
      </svg>
    )
  }

 export function Success(props) {
    return (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M213.333 0C95.513 0 0 95.513 0 213.333s95.513 213.334 213.333 213.334 213.334-95.513 213.334-213.334C426.667 95.513 331.154 0 213.333 0zm0 384c-94.105 0-170.666-76.561-170.666-170.667 0-94.105 76.56-170.666 170.666-170.666S384 119.227 384 213.333 307.439 384 213.333 384zm80.336-246.886l30.167 30.167L192 299.67l-79.083-79.083 30.166-30.167L192 239.336l101.67-102.222z"
          transform="translate(42.667 42.667)"
          fill="#005657"
          stroke="none"
          strokeWidth={1}
          fillRule="evenodd"
        />
      </svg>
    )
  }