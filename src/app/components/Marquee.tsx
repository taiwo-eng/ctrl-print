// TODO: implement ring buffer for animation loop
// dequeue first element after an interval
// enqueue dequeued element immediately


export function Marquee() {
    return (
        <div className="marquee">
            <p>
            <span className="asterisk">*</span>
            <span>
             INTRODUCING THE YOSOLA COLLECTION
            </span>
            <span className="asterisk">*</span>
            <span>
             MADE IN AFRICA 
            </span>
            <span className="asterisk">*</span>
            <span>
            CURATED WITH ❤️
            </span>
            <span className="asterisk">*</span>
            <span>
            PACKAGE HAS ARRIVED
            </span>
            <span className="asterisk">*</span>
            <span>
            PLEASE REMAIN SEATED
            </span>
            <span className="asterisk">*</span>
            <span>
            FREE SHIPPING ON ORDERS $150+
            </span>
            <span className="asterisk">*</span>
            <span>
            SHIPPING STARTS SEPT 14TH
            </span>
            </p>
        </div>
    )
}