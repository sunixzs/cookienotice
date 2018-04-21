<?php
if (! defined ( 'TYPO3_MODE' ) || TYPO3_MODE !== 'FE') {
	die ( 'Could not access this script directly!' );
}
// Hand over to the Eid Utility Object
/** @var $dispatcher MAB\CookieNotice\Eid\ControllerActionDispatcher */
$dispatcher = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance ( \MAB\Cookienotice\Eid\ControllerActionDispatcher::class );
echo $dispatcher->initAndDispatch ();
?>
