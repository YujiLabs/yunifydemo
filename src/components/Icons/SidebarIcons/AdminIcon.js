import React from 'react';

class AdminIcon extends React.Component {
    render() {
        return (
            <svg 
                className={this.props.className} 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M10 2.5C7.79086 2.5 6 4.29086 6 6.5C6 8.70914 7.79086 10.5 10 10.5C12.2091 10.5 14 8.70914 14 6.5C14 4.29086 12.2091 2.5 10 2.5ZM4.5 6.5C4.5 3.73858 6.73858 1.5 10 1.5C13.2614 1.5 15.5 3.73858 15.5 6.5C15.5 9.26142 13.2614 11.5 10 11.5C6.73858 11.5 4.5 9.26142 4.5 6.5ZM7 13.5C5.61929 13.5 4.5 14.6193 4.5 16C4.5 17.3807 5.61929 18.5 7 18.5H13C14.3807 18.5 15.5 17.3807 15.5 16C15.5 14.6193 14.3807 13.5 13 13.5H7ZM3.5 16C3.5 13.5147 5.51472 11.5 8 11.5H12C14.4853 11.5 16.5 13.5147 16.5 16C16.5 18.4853 14.4853 20.5 12 20.5H8C5.51472 20.5 3.5 18.4853 3.5 16Z" 
                />
                <mask id="admin" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="1" width="14" height="20">
                    <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M10 2.5C7.79086 2.5 6 4.29086 6 6.5C6 8.70914 7.79086 10.5 10 10.5C12.2091 10.5 14 8.70914 14 6.5C14 4.29086 12.2091 2.5 10 2.5ZM4.5 6.5C4.5 3.73858 6.73858 1.5 10 1.5C13.2614 1.5 15.5 3.73858 15.5 6.5C15.5 9.26142 13.2614 11.5 10 11.5C6.73858 11.5 4.5 9.26142 4.5 6.5ZM7 13.5C5.61929 13.5 4.5 14.6193 4.5 16C4.5 17.3807 5.61929 18.5 7 18.5H13C14.3807 18.5 15.5 17.3807 15.5 16C15.5 14.6193 14.3807 13.5 13 13.5H7ZM3.5 16C3.5 13.5147 5.51472 11.5 8 11.5H12C14.4853 11.5 16.5 13.5147 16.5 16C16.5 18.4853 14.4853 20.5 12 20.5H8C5.51472 20.5 3.5 18.4853 3.5 16Z" 
                    />
                </mask>
                <g mask="url(#admin)">
                    <rect width="20" height="20" />
                </g>
            </svg>
        );
    }
}

export default AdminIcon;
