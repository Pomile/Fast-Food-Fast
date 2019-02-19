import createElement from '../tools/createElement';

const howItWorksStep = (icon, description) => {
  const howItWorksStepDiv = createElement('div');
  howItWorksStepDiv.className = 'landingBlock__how-it-works-step';
  const howItWorksIconDiv = createElement('div');
  howItWorksIconDiv.className = 'landingBlock__how-it-works-icon';
  const howItWorksIcon = createElement('i');
  howItWorksIcon.className = 'material-icons -fs-cs-xxlarge';
  howItWorksIcon.innerHTML = icon;
  howItWorksIconDiv.appendChild(howItWorksIcon);

  const howItWorksDescriptionDiv = createElement('div');
  howItWorksDescriptionDiv.className = 'landingBlock__how-it-works-description';
  const howItWorksDescription = createElement('span');
  howItWorksDescription.className = '-whiteTxtColor -fs-cs-small -fw-bold';
  howItWorksDescription.innerHTML = description;
  howItWorksDescriptionDiv.appendChild(howItWorksDescription);

  howItWorksStepDiv.appendChild(howItWorksIconDiv);
  howItWorksStepDiv.appendChild(howItWorksDescriptionDiv);

  return howItWorksStepDiv;
};

const howItWorks = (icons, descriptions) => {
  const landingBlockHowItWorksDiv = createElement('div');
  landingBlockHowItWorksDiv.className = 'landingBlock__how-it-works';
  icons.map((icon, i) => {
    const step = howItWorksStep(icon, descriptions[i]);
    landingBlockHowItWorksDiv.appendChild(step);
  });

  return landingBlockHowItWorksDiv;
};

const landingBlock = () => {
  const landingBlockDiv = createElement('div');
  landingBlockDiv.className = 'landingBlock';
  const landingBlockDivBackdrop = createElement('div');
  landingBlockDivBackdrop.className = 'landingBlock__backdrop -transparentBg';

  // Caption
  const landingBlockCaptionDiv = createElement('div');
  landingBlockCaptionDiv.className = 'landingBlock__caption -transparentBg';
  const landingBlockCaptionheader = createElement('h1');
  landingBlockCaptionheader.className = 'landingBlock__caption-font-size';
  landingBlockCaptionheader.innerHTML = 'Order for Fast Food Online';
  landingBlockCaptionDiv.appendChild(landingBlockCaptionheader);

  const landingBlockCaptionheader2 = createElement('h1');
  landingBlockCaptionheader2.className = 'landingBlock__caption-2 landingBlock__caption-2-txtShadow -whiteTxtColor landingBlock__caption-2-font-size';
  landingBlockCaptionheader2.innerHTML = 'How it works';

  const how = howItWorks(['add_shopping_cart', 'payment', 'motorcycle'], ['Place your Order', 'Make payment', 'We deliver']);

  landingBlockDiv.appendChild(landingBlockDivBackdrop);
  landingBlockDiv.appendChild(landingBlockCaptionDiv);
  landingBlockDiv.appendChild(landingBlockCaptionheader2);
  landingBlockDiv.appendChild(how);

  return landingBlockDiv;
};
export default landingBlock;
