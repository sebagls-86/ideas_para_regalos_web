import React from "react";
import { ReactComponent as WriteIcon } from "../../assets/icon-write.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icon-calendar.svg";
import { ReactComponent as EventIcon } from "../../assets/icon-event.svg";
import { ReactComponent as ImageIcon } from "../../assets/icon-image.svg";
import { ReactComponent as HeartIcon } from "../../assets/icon-heart.svg";
import { ReactComponent as ListIcon } from "../../assets/icon-list.svg";



const MyIcon = ({ name, ...props }) => {
    const icons = {
      write: WriteIcon, 
      calendar: CalendarIcon,
      event: EventIcon,
      image: ImageIcon,
      heart: HeartIcon,
      list: ListIcon,
    };

    const SelectedIcon = icons[name];

    if (!SelectedIcon) {
      console.error(`Icon ${name} not found`);
      return null;
    }

    return <SelectedIcon {...props} />;
};

export default MyIcon;
