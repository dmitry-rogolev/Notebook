<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <!-- <link rel="preconnect" href="https://fonts.bunny.net"> -->
        <!-- <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> -->

        <link rel="preconnect" href="https://fonts.cdnfonts.com">

        <!-- serif -->
        <link href="https://fonts.cdnfonts.com/css/times-new-roman" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/bodoni" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/garamond" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/minion-web-pro" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/stone-serif-itc-pro" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/georgia" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/minion-pro" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/raanan" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/cicero-serif" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/wonderland" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/montcers" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/hfbronte" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/cooperbits" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/bridga-goldeni" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/sunroll" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/hauntress" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/serfiyan" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/roghiska" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/henk-singer" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/magistech" rel="stylesheet">
        
        <!-- sans-serif -->

        <link href="https://fonts.cdnfonts.com/css/trebuchet-ms-2" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/itc-avant-garde-gothic-std-book" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/arial" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/verdana" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/univers" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/futura" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/gill-sans" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/akzidenz-grotesk-next" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/helvetica-2" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/tahoma" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/gill-sans" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/helvetica-neue-9" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/lucida-sans-unicode" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/a-otf-shin-go-pro" rel="stylesheet">
                
        <!-- cursive -->

        <link href="https://fonts.cdnfonts.com/css/snell-roundhand" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/itc-zapf-chancery" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/segoe-script" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/audrey" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/signature-collection" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/barley" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/wild-love" rel="stylesheet">
                
        <!-- fantasy -->

        <link href="https://fonts.cdnfonts.com/css/fb-mainland" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/fantasia" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/wonder-night" rel="stylesheet">
                
        <!-- monospace -->

        <link href="https://fonts.cdnfonts.com/css/courier-new" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/prestige-elite-std" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/everson-mono-latin-6" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/ubuntu-mono-2" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/lt-binary-neue" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/sudo-var" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/dec-terminal-modern" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/borgen" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/thegoodmonolith" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/eingrantch-mono" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/b612-mono" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/major-mono-display-2" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/code-new-roman-2" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/sf-mono" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/roboto-mono" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/noto-mono" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/share-techmono-2" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/whois" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/league-mono" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/freemono" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/nrt-reg" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
