urlencode() {
    # urlencode <string>
    old_lc_collate=$LC_COLLATE
    LC_COLLATE=C
    
    local length="${#1}"
    for (( i = 0; i < length; i++ )); do
        local c="${1:i:1}"
        case $c in
            [a-zA-Z0-9.~_-]) printf "$c" ;;
            ' ') printf "%%20" ;;
            *) printf '%%%02X' "'$c" ;;
        esac
    done
    
    LC_COLLATE=$old_lc_collate
}

cd ~/Workspace/private/browse/packages/app
export HOSTNAME=0.0.0.0 
export PORT=8080
yarn start > /tmp/browse.log 2>&1 &

encoded=$(urlencode "$1")

open "http://127.0.0.1:8080/playlist/$encoded"
