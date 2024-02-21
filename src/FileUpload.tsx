/*

 MIT License

 Copyright (c) 2022 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */
import React, { useContext, useEffect, useState } from 'react'
import type { InputFileProps } from '@looker/components'
import {
  Button,
  Card,
  CardContent,
  ComponentsProvider,
  Grid,
  Heading,
  InputFile,
  InputText,
  Label,
  MenuHeading,
  Paragraph,
  ProgressCircular,
  Space,
  SpaceVertical,
  Span,
} from '@looker/components'
import { ExtensionContext40 } from '@looker/extension-sdk-react'
import { getTemplates, uploadFile } from './api'

const FileUploadInput = (props: InputFileProps) => {
  const {
    handleFile = () => {
      // file handling logic here
    },
    accept = '.xlsx,.csv',
    value = 'Accepts only PDF files',
    placeholder = 'File not selected',
    ...restProps
  } = props

  return (
    <>
      <InputFile
        handleFile={handleFile}
        accept={accept}
        value={value}
        placeholder={placeholder}
        {...restProps}
      />
    </>
  )
}

const Loading = () => {
  return (
    <Space justify="center" height={'50vh'}>
      <ProgressCircular />
      Saving template...
    </Space>
  )
}
export const FileUpload: React.FC = () => {
  const { coreSDK } = useContext(ExtensionContext40)
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [templateName, setTemplateName] = useState<string>('')
  const [fileName, setFileName] = useState<string[]>()
  const [showFileName, setShowFileName] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [existingTemplates, setExistingTemplates] = useState<string[]>([
    'template1',
    'template2',
  ])

  useEffect(() => {
    const getMe = async () => {
      try {
        const me = await coreSDK.ok(coreSDK.me())
        setMessage(`Hello, ${me.display_name}`)
      } catch (error) {
        console.error(error)
        setMessage('An error occurred while getting information about me!')
      }
    }
    getMe()
  }, [coreSDK])

  const handleSubmit = () => {
    if (file) {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('templateName', templateName)

      uploadFile(formData).then(
        (response) => {
          // eslint-disable-next-line no-console
          console.log(response)
          setShowFileName(false)
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      )

      setTimeout(() => {
        setIsLoading(false)
      }, 4000)
    }
  }

  const extractFileName = (file: File): [string, string] => {
    const { name } = file
    const separatedValues = name.split('.')
    return [
      separatedValues[separatedValues.length - 2],
      separatedValues[separatedValues.length - 1],
    ]
  }

  useEffect(() => {
    const templates = () => {
      getTemplates().then((response) => {
        // eslint-disable-next-line no-console
        console.log(response)
      })
    }
    templates()
  }, [])

  return (
    <ComponentsProvider
      themeCustomizations={{
        colors: { key: '#1A73E8' },
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <CardContent maxWidth={'50%'}>
          <Heading marginBottom={'10px'}>Upload Template</Heading>
          <Space gap={'small'} marginTop={'10px'} marginBottom={'20px'}>
            <FileUploadInput
              buttonText="Chose Template"
              handleFile={function (value: File): void {
                // eslint-disable-next-line no-console
                console.log(value)
                setFile(value)
                const arr = extractFileName(value)
                setFileName(arr)
                setTemplateName(arr[0])
                setShowFileName(true)
              }}
            />
          </Space>
          {showFileName ? (
            <>
              <Span>Template Name</Span>
              <Space gap={'small'} marginTop={'10px'}>
                <InputText
                  width={'76%'}
                  defaultValue={templateName}
                  onChange={(e) => {
                    const value = e.target.value
                    if (!value.includes('.')) {
                      setTemplateName(value)
                    } else {
                      console.error('Template name should not contain dots')
                    }
                  }}
                ></InputText>
              </Space>
              <Space gap={'small'} marginTop={'15px'}>
                <Button
                  onClick={handleSubmit}
                  disabled={templateName.length === 0}
                >
                  Save Template
                </Button>
              </Space>
            </>
          ) : (
            <></>
          )}
          {existingTemplates ? (
            <SpaceVertical gap={'small'} marginTop={'50px'}>
              <Heading>Existing Templates</Heading>
              {existingTemplates.map((template, index) => (
                <Paragraph key={index}>
                  {index + 1}. {template}
                </Paragraph>
              ))}
            </SpaceVertical>
          ) : (
            <></>
          )}
        </CardContent>
      )}
    </ComponentsProvider>
  )
}
