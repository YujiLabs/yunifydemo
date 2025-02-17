import React from 'react';

class EquipmentIcon extends React.Component {
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
                    d="M10 1.667C14.603 1.667 18.333 5.397 18.333 10C18.333 14.603 14.603 18.333 10 18.333C5.397 18.333 1.667 14.603 1.667 10C1.667 5.397 5.397 1.667 10 1.667ZM10 4.167C7.606 4.167 5.667 6.106 5.667 8.5C5.667 10.894 7.606 12.833 10 12.833C12.394 12.833 14.333 10.894 14.333 8.5C14.333 6.106 12.394 4.167 10 4.167Z"
                />
            </svg>
        );
    }
}

export default EquipmentIcon;
