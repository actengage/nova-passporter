# Passporter

This package provides a UI for Passport inside of Nova to manage OAuth clients, tokens, and auth codes. It also provides an interface to install and configure the various parts of Passport, which can make using OAuth for the first time much easier.

## Installation

```
composer install actengage/nova-passporter
```

Open `app/Providers/NovaServiceProvider.php` and add the following code to the to `tools()` method.

``` php
/**
 * Get the tools that should be listed in the Nova sidebar.
 *
 * @return array
 */
public function tools()
{
    return [
        new Passporter()
    ];
}
```

## Usage

Passporter will appear in the navigation of Nova. Passporter merely provides Resources for Nova and displays them in a different location in the navbar. Everything you would expect to function with a model and resource also functions with Passporter resoruces.

![Screenshot of Navigation](./sidebar.png?raw=true)

## Setup Guide

We find that the initial setup of OAuth to often be the hardest part. This tool aims to get up and started quicker inside of your production environments, and without having to SSH into your server.

![Screenshot of Installer](./installer.png?raw=true)