import "../css/stylesheet.css";
import { Phone, CameraIcon } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">
        
        
        <p className="footer_text">
          © 2026 RetroRoom. All rights reserved.
        </p>

       
        <div className="contacts_div">
          <div className="contact_item">
            <a>
                <Phone className="phone_icon"/> +961 81 984 172
            </a>
          </div>

          <div className="contact_item">
            <a>
                <CameraIcon className="instagram_icon"/> @retroroom.leb
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;