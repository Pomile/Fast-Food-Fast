const thSn = document.getElementById('th-sn');
const thCustomer = document.getElementById('th-customerName');
const thDescription = document.getElementById('th-description');
const thTime = document.getElementById('th-time');
const thDeliveryTime = document.getElementById('th-deliveryTime');
const thPrice = document.getElementById('th-price');
const thActions = document.getElementById('th-actions');
const thComplete = document.getElementById('th-complete');
const thPicture = document.getElementById('th-picture');
const thOrderDate = document.getElementById('th-orderDate');
const thOrderTime = document.getElementById('th-orderTime');
const thOrderQuantity = document.getElementById('th-quantity');
const thAmount = document.getElementById('th-amount');
const thStatus = document.getElementById('th-status');
const customerOrders = document.getElementById('customerOrders');
const userOrder = document.getElementById('userOrder');


const hSn = document.getElementById('h-sn');
const hCustomer = document.getElementById('h-customerName');
const hDescription = document.getElementById('h-description');
const hTime = document.getElementById('h-orderTime');
const hDeliveryTime = document.getElementById('h-deliveryTime');
const hPrice = document.getElementById('h-price');
const hActions = document.getElementById('h-actions');
const hComplete = document.getElementById('h-complete');

const scrollBlock = document.getElementById('scrollBlock');

function resCol() {
  const serialNoCol = thSn.getClientRects()[0].width;
  const customerCol = thCustomer.getClientRects()[0].width;
  const timeCol = thTime.getClientRects()[0].width;
  const descriptionCol = thDescription.getClientRects()[0].width;
  const deliveryTime = thDeliveryTime.getClientRects()[0].width;
  const priceCol = thPrice.getClientRects()[0].width;
  const actionsCol = thActions.getClientRects()[0].width;
  const completeCol = thComplete.getClientRects()[0].width;
  document.getElementById('h-sn').style.width = (serialNoCol - 10).toString().concat('px');
  document.getElementById('h-customerName').style.width = (customerCol - 10.9).toString().concat('px');
  document.getElementById('h-description').style.width = (descriptionCol - 10.9).toString().concat('px');
  document.getElementById('h-orderTime').style.width = (timeCol - 10.9).toString().concat('px');
  document.getElementById('h-deliveryTime').style.width = (deliveryTime - 10.9).toString().concat('px');
  document.getElementById('h-price').style.width = (priceCol - 10.9).toString().concat('px');
  document.getElementById('h-actions').style.width = (actionsCol - 10.9).toString().concat('px');
  document.getElementById('h-complete').style.width = (completeCol - 10.9).toString().concat('px');
}


function resCol2() {
  const serialNoCol = thSn.getClientRects()[0].width;
  const pictureCol = thPicture.getClientRects()[0].width;
  const descriptionCol = thDescription.getClientRects()[0].width;
  const dateCol = thOrderDate.getClientRects()[0].width;
  const timeCol = thOrderTime.getClientRects()[0].width;
  const quantityCol = thOrderQuantity.getClientRects()[0].width;
  const amountCol = thAmount.getClientRects()[0].width;
  const statusCol = thStatus.getClientRects()[0].width;
  document.getElementById('h-sn').style.width = (serialNoCol - 10.9).toString().concat('px');
  document.getElementById('h-picture').style.width = (pictureCol - 10.9).toString().concat('px');
  document.getElementById('h-description').style.width = (descriptionCol - 10.9).toString().concat('px');
  document.getElementById('h-orderDate').style.width = (dateCol - 10.9).toString().concat('px');
  document.getElementById('h-orderTime').style.width = (timeCol - 10.9).toString().concat('px');
  document.getElementById('h-quantity').style.width = (quantityCol - 10.9).toString().concat('px');
  document.getElementById('h-amount').style.width = (amountCol - 10.9).toString().concat('px');
  document.getElementById('h-status').style.width = (statusCol - 10.9).toString().concat('px');
}

function displayTableHeader() {
  const scrollBlockTop = scrollBlock.scrollTop;
  if (scrollBlockTop > 30 && window.visualViewport.width > 700) {
    document.getElementById('tableHeader').style.background = 'orangered';
    document.getElementById('table__scroll-pad').style.background = 'rgb(180, 50, 3)';
  }

  if (scrollBlockTop <= 25) {
    document.getElementById('tableHeader').style.background = 'white';
    document.getElementById('table__scroll-pad').style.background = 'white';
  }
}

// Get all elements with class="closebtn"
const close = document.getElementsByClassName('closebtn');
let i;

// Loop through all close buttons
for (i = 0; i < close.length; i++) {
  // When someone clicks on a close button
  close[i].onclick = function () {
    // Get the parent of <span class="closebtn"> (<div class="alert">)
    const div = this.parentElement;

    // Set the opacity of div to 0 (transparent)
    div.style.opacity = '0';

    // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
    setTimeout(() => { div.style.display = 'none'; }, 600);
  };
}

if (customerOrders) {
  window.addEventListener('load', resCol);
  window.addEventListener('resize', resCol);
  scrollBlock.addEventListener('scroll', displayTableHeader);
  scrollBlock.addEventListener('scroll', resCol);
  const order1 = document.getElementById('1');
  if (order1) {
    order1.addEventListener('click', () => showModal('modal'));
  }
}

const showModal = id => document.getElementById(id).style.display = 'block';

const closeModal = (id) => {
  document.getElementById(id).style.display = 'none';
};

if (userOrder) {
  window.addEventListener('load', resCol2);
  window.addEventListener('resize', resCol2);
  scrollBlock.addEventListener('scroll', displayTableHeader);
  scrollBlock.addEventListener('scroll', resCol2);
}
