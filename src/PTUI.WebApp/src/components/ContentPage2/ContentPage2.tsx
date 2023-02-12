import React from 'react';
import road1 from '../../assets/images/example/road-1.jpg'
import sunset1 from '../../assets/images/example/sunset-1.jpg'
import globalStyle from "../../assets/styles/globalStyle.module.scss";

function ContentPage2() {
    return( 
        <div>
            <h1>Example Content Page 2</h1>
            <h2>Etiam massa antm</h2>
            <p className={globalStyle.textContent}>Etiam massa ante, maximus ut augue eget, molestie ullamcorper nunc. Aliquam nisi arcu, auctor et velit a, faucibus eleifend erat. Suspendisse consequat hendrerit aliquet. Mauris ut libero justo. Suspendisse vel porttitor lacus, quis semper nisl. Sed congue diam felis, rhoncus aliquam mauris consequat nec. Maecenas vehicula faucibus leo, nec tristique justo porttitor at. Donec nec vestibulum nisi. Duis tristique mi quis vestibulum sagittis.</p>
            <p className={globalStyle.textContent}>Maecenas nec quam pulvinar, congue risus nec, venenatis augue. Cras a odio neque. Nulla eget orci aliquet, ullamcorper orci eu, imperdiet sem. Pellentesque ipsum sem, mollis sed nibh at, cursus placerat elit. Aliquam quis laoreet lorem. Donec euismod tellus vel pretium mollis. Cras sit amet aliquet nisi, pellentesque pretium libero. In sit amet leo sollicitudin, gravida nisi sit amet, tincidunt turpis. Phasellus tellus risus, pretium vitae rhoncus nec, pulvinar eu purus.</p>
            <img src={road1} alt={"Road"}/>
            <h3>Proin volutpat</h3>
            <p className={globalStyle.textContent}>Proin volutpat scelerisque gravida. Vestibulum facilisis convallis eros a dictum. Phasellus faucibus nisi ut est elementum mattis id quis nibh. Phasellus mollis vel arcu non iaculis. Fusce odio elit, posuere nec lacinia non, faucibus non ligula. Cras pellentesque cursus gravida. Aliquam dignissim ultricies lacus, in vulputate turpis aliquet id. Sed et lorem ac ante dapibus cursus ut eget dolor.</p>
            <p className={globalStyle.textContent}>Nulla placerat sit amet ex ut tincidunt. Praesent dictum dui ut mauris mollis, sed dictum massa auctor. In hac habitasse platea dictumst. Donec egestas augue eget metus auctor, et egestas libero dapibus. Aliquam euismod non ante eget placerat. Nulla viverra, eros ac elementum accumsan, odio justo molestie odio, id venenatis diam eros eget justo. Nulla ligula nisl, gravida non nisi et, semper pharetra arcu. Nam non purus varius, egestas tellus sit amet, hendrerit lorem. Nam convallis in velit at pretium. In tristique accumsan tellus ac hendrerit. Mauris et vulputate velit. Curabitur scelerisque erat tortor, nec aliquet odio lacinia vel. Sed at mattis sapien, aliquam sodales augue. Etiam consectetur in velit in ultrices. Nulla condimentum ante a mattis pellentesque.</p>
            <img src={sunset1} alt={"Sunset"}/>
            <h3>Aenean scelerisque</h3>
            <p className={globalStyle.textContent}>Aenean scelerisque nunc eget eros commodo feugiat. Nam rutrum lectus id elit condimentum, sed efficitur erat efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi eget lacinia leo. Quisque pretium nisl justo, consectetur ultrices nibh rutrum condimentum. Proin eu felis nec augue blandit iaculis suscipit vel odio. Phasellus eu semper metus, id molestie massa. Phasellus vitae euismod velit, a vestibulum magna.</p>
            <p className={globalStyle.textContent}>Quisque eu arcu convallis, lacinia quam vitae, finibus arcu. Donec malesuada, arcu at ullamcorper pharetra, sapien est rutrum nibh, at feugiat augue est ac sapien. Fusce elementum accumsan elit, at fermentum quam. Praesent at augue sodales, fermentum nunc nec, elementum libero. Vestibulum vel sem nec risus eleifend fermentum eu vitae nisl. Mauris vel sollicitudin risus. Sed mollis sed leo sed feugiat. Donec luctus quam eu dignissim elementum. Donec gravida, mauris vel consequat volutpat, lectus risus semper dui, non commodo nulla ex sed nulla. Sed viverra aliquet nunc a vulputate. Maecenas nec odio posuere, eleifend libero lacinia, molestie mi. Suspendisse potenti. Phasellus dignissim a arcu at imperdiet. Pellentesque blandit massa elit, eu porttitor ante mollis a.</p>
        </div> 
    )
}

export default ContentPage2;