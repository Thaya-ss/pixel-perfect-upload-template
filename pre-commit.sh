{
  which eslint &> /dev/null
} || {
  echo "\t\033[41mPlease install ESlint\033[0m"
  exit 1
}

{
  which prettier &> /dev/null
} || {
  echo "\t\033[41mPlease install Prettier\033[0m"
  exit 1
}

{
   ALL_STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)
} || {
  ALL_STAGED_FILES=''
}

if [[ "$ALL_STAGED_FILES" = "" ]]; then
  echo "\t\033[41mNo Staged Files\033[0m"
  exit 1
fi


{
  STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '.*\.(js|jsx|tsx|ts|scss|css)$')
} || {
  STAGED_FILES=''
}

ESLINT_ERROR_FILES=''

for FILE in $STAGED_FILES
do
  {
    eslint "$FILE"
  if [[ "$?" != 0 ]]; then
      ESLINT_ERROR_FILES="${ESLINT_ERROR_FILES} \t ${FILE}"
  fi

  } || { 
    ESLINT_ERROR_FILES="${ESLINT_ERROR_FILES} \t ${FILE}"
  }
  
done

PRETTIER_ERROR_FILES=''

for FILE in $STAGED_FILES
do
  {
    prettier "$FILE" -c
  if [[ "$?" != 0 ]]; then
      PRETTIER_ERROR_FILES="${PRETTIER_ERROR_FILES} \t ${FILE}"
  fi
  } || { 
    PRETTIER_ERROR_FILES="${PRETTIER_ERROR_FILES} \t ${FILE}"
  }
  
done

if [[ $ESLINT_ERROR_FILES != '' ]];  then
  echo "\033[41mCOMMIT FAILED:\033[0m Please fix lint issues in below files.\n $ESLINT_ERROR_FILES"
fi

if [[ $PRETTIER_ERROR_FILES != '' ]];  then
  echo "\033[41mCOMMIT FAILED:\033[0m Please fix prettier issues in below files.\n $PRETTIER_ERROR_FILES"
fi

if [ "$ESLINT_ERROR_FILES" != "" ] || [ "$PRETTIER_ERROR_FILES" != "" ];  then
  exit 1
fi

echo "\033[42mCOMMIT SUCCEEDED\033[0m\n"
exit $?