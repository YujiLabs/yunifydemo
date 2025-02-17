import React from 'react';

class ReportsIcon extends React.Component {
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
                    d="M3.333 2.5H10.833C11.144 2.5 11.417 2.711 11.494 3.014L12.06 5H16.667C17.401 5 18 5.599 18 6.333V16.667C18 17.401 17.401 18 16.667 18H3.333C2.599 18 2 17.401 2 16.667V3.333C2 2.599 2.599 2 3.333 2.5ZM4.5 8H9.167V9.167H4.5V8ZM4.5 11.167H11.167V12.333H4.5V11.167ZM4.5 14.333H13.833V15.5H4.5V14.333Z" 
                />
            </svg>
        );
    }
}

export default ReportsIcon;
