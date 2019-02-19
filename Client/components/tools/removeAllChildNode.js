
const removeAllRootChildNode = () => {
  const root = document.getElementById('root');
  while (root.hasChildNodes()) {
    root.removeChild(root.firstChild);
  }
};

export default removeAllRootChildNode;
