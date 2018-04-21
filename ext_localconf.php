<?php
if (! defined('TYPO3_MODE')) {
    die('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
    'MAB.' . $_EXTKEY,
    'Pi1',
    [
        'CookieNotice' => 'integration,content'
    ],
    [
        'CookieNotice' => ''
    ]
);

// Dispatching requests for ajax actions which requests a controlleraction
$GLOBALS['TYPO3_CONF_VARS']['FE']['eID_include']['CookieNotice'] = 'EXT:' . $_EXTKEY . '/Resources/Private/Eid/ControllerActionDispatcher.php';
